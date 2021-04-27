
const getTotalTweetsForSpecificCategories = (categories, setData) => {

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({categories: categories})
    };
    fetch('/total', requestOptions)
        .then(response => response.json())
        .then(data => setData(data));
}

export default getTotalTweetsForSpecificCategories;