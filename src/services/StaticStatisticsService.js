
const getTotalTweetsForSpecificCategories = (categories, dateRange, setData) => {

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({categories: categories,
                              dateRange: dateRange})
    };
    fetch('/total', requestOptions)
        .then(response => response.json())
        .then(data => setData(data));
}

const getTotalLikesForSpecificCategories = (categories, dateRange, setData) => {

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({categories: categories,
                              dateRange: dateRange})
    };
    fetch('/total-likes', requestOptions)
        .then(response => response.json())
        .then(data => setData(data));
}

const getTotalRetweetsForSpecificCategories = (categories, dateRange, setData) => {

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({categories: categories,
                              dateRange: dateRange})
    };
    fetch('/total-retweets', requestOptions)
        .then(response => response.json())
        .then(data => setData(data));
}

export {getTotalTweetsForSpecificCategories, getTotalLikesForSpecificCategories, getTotalRetweetsForSpecificCategories};