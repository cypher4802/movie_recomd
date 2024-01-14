const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Movie = require("./models/movies");
const puppeteer = require('puppeteer');

// URL TO FETCH DATA
const imdbURI = 'https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm';
// URL FOR DATABSE
const mongoURI = 'mongodb+srv://tanmay258789:TkfIatpc1yhxauRL@cluster0.dey9osy.mongodb.net/cinneslight';
const dbName = 'cinneslight';

// CONNECT TO MONGODB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


// IMPORT MOVIE MODEL







// FUNCTION TO EXTRACT MOVIE INFORMATION FROM HTML AN SAVE TO DB
const extractAndSaveMovies = async (page) => {
  const movieElements = await page.$$('.titleColumn');
  for (const element of movieElements) {
    const title = await element.$eval('.ipc-title__text', (node) => node.textContent.trim());
    const rating = await element.$eval('.ipc-rating-star .sc-14p9gku-2.cStpph', (node) => node.textContent.trim());
    const posterUrl = await element.$eval('.ipc-image', (node) => node.getAttribute('src'));

    const moviePageUrl = `https://www.imdb.com${await element.$eval('.ipc-title__text', (node) => node.getAttribute('href'))}`;
    const moviePage = await browser.newPage();
    await moviePage.goto(moviePageUrl);

    const runtime = await moviePage.$eval('.sc-43986a27-8.jHYIIK.cli-title-metadata-item', (node) => node.textContent.trim());
    const genre = await moviePage.$$eval('.subtext a:not(:last-child)', (nodes) => nodes.map((node) => node.textContent.trim()));
    const platforms = await moviePage.$$eval('.watch-option', (nodes) => nodes.map((node) => node.textContent.trim()));

    await moviePage.close();

    try {
      const newMovie = new Movie({
        title,
        rating,
        poster: posterUrl,
        runtime,
        genres: genre,
        platforms,
      });

      await newMovie.save();
      console.log(`Saved:${title}`);
    } catch (saveError) {
      console.error('Error saving movie:', saveError);
    }

  }
};
const scrapeAndSaveIMDb = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(imdbURI);
    await page.waitForSelector('.titleColumn')
  } catch (error) {
    console.error('Error scraping and saving IMDb data:', error);

  } finally {
    await browser.close();
    mongoose.connection.close();
  }
};


scrapeAndSaveIMDb();