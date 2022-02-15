import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const cryptoNewsHeader = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '19d3bfcd8dmshb884167ac62bc92p1a012fjsn7ef08763e148'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoNewsHeader})

export const cryptoNews = createApi({
    reudcerPath: 'cryptoNews',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        }),
    })
})

export const { useGetCryptoNewsQuery } = cryptoNews