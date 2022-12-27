function getTodayDate() {
    
    const currentTime = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    const today = currentTime.toLocaleDateString('en-us', options);
    return today;
}

module.exports = getTodayDate;