class DB {
    constructor(url){
        this.url = url;
    }
 async getAllAdsInDB() {
        const response = await fetch(this.url);
        const data = await response.json();
    
        return data;
      }
  }

