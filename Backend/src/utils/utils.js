const utils = {

    sleep: (time) => {
        return new Promise(resolve => setTimeout(resolve, time));
    },
    
    getDayDifferenceFromDate: (dateInput) => {
        const inputDate = new Date(dateInput); // works with both string and Date
        const now = new Date();

        const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const inputDateUTC = new Date(Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate()));

        const diffTime = todayUTC - inputDateUTC;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return diffDays; // negative for future, 0 for today, positive for past
    },

    // Get previous date in UTC
    getPreviousDate: (dateStr, daysBack = 1) => {
        const date = new Date(dateStr + "T00:00:00Z");
        date.setUTCDate(date.getUTCDate() - daysBack);
        return date.toISOString().split('T')[0];
    },

    // Get next date in UTC
    getNextDate: (dateStr, daysAhead = 1) => {
        const date = new Date(dateStr + "T00:00:00Z");
        date.setUTCDate(date.getUTCDate() + daysAhead);
        return date.toISOString().split('T')[0];
    },

    // Compare two UTC date strings (YYYY-MM-DD)
    compareDates: (dateStr1, dateStr2) => {
        if (dateStr1 < dateStr2) return -1;
        if (dateStr1 > dateStr2) return 1;
        return 0;
    },

    summarizeSubmissionsByDate: (submissions) => {
        const summaryMap = {};

        for (const item of submissions) {

            const date = new Date(item.createdAt).toISOString().split('T')[0];
            const status = item.status.toLowerCase(); // Normalize status string

            if (!summaryMap[date]) {
                summaryMap[date] = {
                    date,
                    count: 0,
                    acceptedCount: 0,
                    runtimeErrorCount: 0,
                    compilationErrorCount: 0,
                    wrongAnswerCount: 0,
                    tleCount: 0,
                    pendingCount: 0
                };
            }

            summaryMap[date].count++;
            if (status === 'accepted') summaryMap[date].acceptedCount++;
            else if (status === 'wrong-answer') summaryMap[date].wrongAnswerCount++;
            else if (status === 'tle') summaryMap[date].tleCount++;
            else if (status === 'runtime-error') summaryMap[date].runtimeErrorCount++;
            else if (status === 'compilation-error') summaryMap[date].compilationErrorCount++;
            else if (status === 'pending') summaryMap[date].pendingCount++;
        }

        return Object.values(summaryMap).sort((a, b) => a.date.localeCompare(b.date));
    },

    extractJSONFromCodeBlock: (input) => {
        const match = input.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
        if (match && match[1]) {
            return match[1].trim();
        }
        return null;
    },

    getMappedValue: (value) => {
        switch(value) {
            case "emailId":
                return "Email Id";
            case "username":
                return "Username";
            default: 
                return "Given value";
        }
    }

}


module.exports = utils;