import { defineStore } from "pinia";

export const useUrlStore = defineStore('iconurl',()=>{
    const baseurl = 'https://cdn.jsdelivr.net/gh/JiaranYa/Akashastore@master/'

    return {baseurl}
})