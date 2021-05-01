
const getTotalCountForSpecificCategories = (categories, dateRange, setData, type) => {

    let attr;

    switch (type) {
        case "TotalTweetsCount":
            attr = "tweets"
            break;
        case "TotalLikesCount":
            attr = "likes";
            break;
        case "TotalRetweetsCount":
            attr = "retweets";
            break;
        default:
            attr = "";
            break;
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            categories: categories,
            dateRange: dateRange,
            attribute: attr
        })
    };

    fetch('/total-count', requestOptions)
        .then(response => response.json())
        .then(data => setData(data));
}

export { getTotalCountForSpecificCategories };