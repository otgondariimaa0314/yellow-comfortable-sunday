const checkAge = (birthdate, ageLimit) => {
    let birthday = new Date(birthdate);
    let today = new Date();

    let age = today.getFullYear() - birthday.getFullYear();
    let monthDiff = today.getMonth() - birthday.getMonth();
            
    // If the birth month hasn't occurred yet this year, subtract one from the age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }
    return age <= ageLimit
}

module.exports = {checkAge}