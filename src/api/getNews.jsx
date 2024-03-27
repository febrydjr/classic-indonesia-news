// import axios from "axios";

// const BASE_URL = "http://localhost:8000";

// async function getNews() {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/news/detail`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     throw error;
//   }
// }

// export default getNews;

import axios from "axios";
import cheerio from "cheerio";

const getNewsLink = async () => {
  const cors = "https://cors-anywhere.herokuapp.com/";
  const url = "https://berita-indo-api-next.vercel.app/api/cnn-news";
  try {
    const response = await axios.get(cors + url);
    return response.data.data;
  } catch (error) {
    console.log("Get News Link: ", error);
  }
};

async function getNews() {
  try {
    const newsData = await getNewsLink();

    const detailNewsPromises = [];

    for (const news of newsData) {
      const promise = axios
        .get(news.link)
        .then((response) => {
          const $ = cheerio.load(response.data);
          const detailNews = $(
            ".detail-text.text-cnn_black.text-sm.grow.min-w-0 p"
          )
            .map((index, element) => $(element).text())
            .get()
            .join("\n");

          const publishedDate = $(".text-cnn_grey.text-sm.mb-4").text().trim();

          const category = $(
            ".text-sm.text-cnn_black_light3.gtm_breadcrumb_subkanal"
          )
            .text()
            .trim();

          const cleanedDetailNews = detailNews
            .replace(/\n/g, " ")
            .replace(/\[Gambas:Video CNN\]/g, "")
            .replace(/ADVERTISEMENT/g, " ")
            .replace(/SCROLL TO CONTINUE WITH CONTENT/g, " ");

          return {
            title: news.title,
            contentSnippet: news.contentSnippet,
            isoDate: news.isoDate,
            publishedDate: publishedDate,
            portal: "CNN Indonesia",
            category: category,
            image: news.image,
            link: news.link,
            detailNews: cleanedDetailNews,
          };
        })
        .catch((error) => {
          console.error(
            `Error fetching detail content for ${news.link}: ${error.message}`
          );
          return {
            title: news.title,
            contentSnippet: news.contentSnippet,
            isoDate: news.isoDate,
            portal: "CNN Indonesia",
            image: news.image,
            link: news.link,
            category: null,
            detailNews: null,
            publishedDate: null,
          };
        });
      detailNewsPromises.push(promise);
    }

    const allDetailNews = await Promise.all(detailNewsPromises);
    return allDetailNews;
  } catch (error) {
    console.log("Get News: ", error);
  }
}

export default getNews;
