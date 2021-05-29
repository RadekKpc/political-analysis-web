
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

const getTweetsForDay = (categories, dateRange, setData, type) => {
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
    console.log('request');
    fetch('/time-count', requestOptions)
        .then(response => response.json())
        .then(data => setData(data));
}

const getWordCloud = (categories, dateRange, setTweetText, type) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            categories: categories,
            dateRange: dateRange,
        })
    };

    fetch('/wordcloud', requestOptions)
        .then(response => response.json())
        .then(data =>
            setTweetText(
                data
                  .map((word) => word.split(" "))
                  .flat(1)
                  .filter(
                    (word) =>
                      !word.match(/#[0-9a-zżźćńółęąś_]+/gi) &&
                      !word.match(/@[0-9a-zżźćńółęąś_]+/gi) &&
                      !word.match(/https.+/gi)
                  )
                  .map((word) => word.replace(/"|\?|„/g, ""))
                  .join(" ")
              ));

}

const getWordCloudHashtags = (categories, dateRange, setTweetText, type) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categories: categories,
      dateRange: dateRange,
    }),
  };

  fetch("/wordcloud", requestOptions)
    .then((response) => response.json())
    .then((data) =>
      setTweetText(
        data
          .map((word) => word.split(" "))
          .flat(1)
          .map((word) => word.match(/#[a-zżźćńółęąś]+/gi))
          .join(" ")
      )
    );
};

export { getTotalCountForSpecificCategories, getTweetsForDay , getWordCloud, getWordCloudHashtags};