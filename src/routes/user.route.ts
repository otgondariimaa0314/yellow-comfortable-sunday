const express = require('express');
const userRouter = express.Router();
const userService = require('../services/user.service.ts');
const storage = require('../utils/storage.ts');


userRouter.post('/', async(req, res) => {
    try {
        
        const {username, wish} = req.body;
        
        const usersResponse = await userService.getUsers();
    
        const user = usersResponse.data.find((e) => e.username === username);
        if(user){
            const profilesResponse = await userService.getProfiles();
            const userProfile = profilesResponse.data.find((e) => e.userUid === user.uid);
            if (userProfile){
                const birthdate = userProfile.birthdate;
                let birthday = new Date(birthdate);
                let today = new Date();

                let age = today.getFullYear() - birthday.getFullYear();
                let monthDiff = today.getMonth() - birthday.getMonth();
            
                // If the birth month hasn't occurred yet this year, subtract one from the age
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
                    age--;
                }
                if(age > 10){
                    res.render('error', { param: 'over 10 years old'});
                }else{
                    const newRequest = {username: username, address: userProfile.address, wish: wish};
                    storage.pendingList.push(newRequest);
                    
                    res.render('success');
                }
            }
            
        }else{
            console.log('user not found');
            res.render('error', { param: 'user not found'});
        }

        
    } catch (error) {
        console.log('ERROR', error)
    }
});


module.exports = userRouter;