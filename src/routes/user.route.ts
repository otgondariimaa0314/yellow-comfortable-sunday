const express = require('express');
const userRouter = express.Router();
const userService = require('../services/user.service.ts');
const storage = require('../utils/storage.ts');
const constrants = require('../constants.ts');
const helpers = require('../utils/helper.util.ts');


userRouter.post('/', async(req, res) => {
    try {
        
        const {username, wish} = req.body;
        
        const usersResponse = await userService.getUsers();
    
        // find from the list by user name
        const user = usersResponse.data.find((e) => e.username === username);
        
        if(user){

            // get all user profile and find by uid
            const profilesResponse = await userService.getProfiles();
            const userProfile = profilesResponse.data.find((e) => e.userUid === user.uid);
            
            if (userProfile){
                // check if age is under 10
                const birthdate = userProfile.birthdate;
                const isUnderAge = helpers.checkAge(birthdate, constrants.AGE_LIMIT);
                
                if (isUnderAge){
                    const newRequest = {username: username, address: userProfile.address, wish: wish};
                    
                    // add to pending request list
                    storage.pendingList.push(newRequest);
                    
                    res.render('success');
                }else{
                    res.render('error', { param: constrants.ERROR_OVER_10});
                }
            }else{
                res.render('error', { param: constrants.ERROR_PROFILE});
            }
            
        }else{
            res.render('error', { param: constrants.ERROR_NOT_IN_LIST});
        }
    } catch (error) {
        res.render('error', { param: constrants.ERROR_SERVER});
        console.log('ERROR', error)
    }
});


module.exports = userRouter;