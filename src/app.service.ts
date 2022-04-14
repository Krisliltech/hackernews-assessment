import { Injectable, NotFoundException } from '@nestjs/common';
import axios from "axios"

@Injectable()
export class AppService {
  async getStories(): Promise<{}> {
    try {
      const { data } = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
     
      const lastStoriesId = data.splice(0,25)
      
      let storyTitles: string[] = [] 
      await Promise.allSettled(lastStoriesId.map(async (storyId) => {
        const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
          
        if (data.title){
          storyTitles.push(data.title.toLowerCase())
        }     
      }))
    
      let titles = storyTitles.join(" ").split(/\s+/)

      let countedTitles = titles.reduce(function (allTitles, title) {
        if (title in allTitles) {
          allTitles[title]++
        }else {
          allTitles[title] = 1
        }
        return allTitles
      }, {})

      const sorted = Object.entries(countedTitles).sort(([a],[b]) => {
        return countedTitles[b]-countedTitles[a]
      })

      const result = Object.fromEntries(sorted.splice(0,10))

      return result
    }catch (err){
      throw new NotFoundException(err, "error")
    }
  }

  async getPostOfLastWeek(): Promise<{}> {
    try {
      const  { data } = await axios.get('https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty')
    
      let dates = new Date();
      dates.setDate(dates.getDate() - 7);
     
      let unix_time = Math.floor(dates.getTime() / 1000)

      let id = Math.floor(data/1.003)

      let diff = (data - id)+1
      let arr = (Array.from({length:diff},(v,k)=>k+id)).reverse()
      
      let storyTitles: string[] = [] 
      await Promise.allSettled(arr.map(async (storyId) => {
        const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
        
        if (data.title){
          if (data.time >= unix_time) {
            storyTitles.push(data.title)
          }
        }
      
      }))

      let titles = storyTitles.join(" ").split(/\s+/)

      let countedTitles = titles.reduce(function (allTitles, title) {
        if (title in allTitles) {
          allTitles[title]++
        }else {
          allTitles[title] = 1
        }
        return allTitles
      }, {})

      const sorted = Object.entries(countedTitles).sort(([a],[b]) => {
        return countedTitles[b]-countedTitles[a]
      })

      const result = Object.fromEntries(sorted.splice(0,10))

      return result
    }catch (err){
      throw new NotFoundException(err, "error")
    }
  }
  
  async getKarmaStories(): Promise<{}> {
    try {
      const { data } = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
      
      let storyTitles =  []
      await Promise.allSettled(data.map(async storyId => {
          const  { data }   = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)  
          
          if (data.title) {
            const response  = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${data.by}.json?print=pretty`)
            
            if(response.data.karma >= 10){
              storyTitles.push(data.title.toLowerCase())
            }
          }     
       }))
        
      let titles = storyTitles.join(" ").split(/\s+/)

      let countedTitles = titles.reduce(function (allTitles, title) {
        if (title in allTitles) {
          allTitles[title]++
        }else {
          allTitles[title] = 1
        }
        return allTitles
      }, {})

      const sorted = Object.entries(countedTitles).sort(([a],[b]) => {
        return countedTitles[b]-countedTitles[a]
      })

      const result = Object.fromEntries(sorted.splice(0,10))

      return result
    }catch (err){
        throw new NotFoundException(err, "error")
    }
  }
  
}
