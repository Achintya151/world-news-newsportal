// console.log('connected');
// Load category data 
const loadAllCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const category = await res.json();
    // console.log(category.data.news_category);
    return (category.data.news_category);
}
// loadAllCategories();
// set menu titles 
const setAllMenu = async () => {
    const category = await loadAllCategories();
    // console.log(category);
    const menu = document.getElementById('all-category');
    const uniqueArray = [];
    for (const data of category) {
        // console.log(data.category_name);
        if (uniqueArray.indexOf(data.category_name) === -1) {
            uniqueArray.push(data.category_name);
            const li = document.createElement('li');
            li.innerHTML = `<a id="menu-key" onClick="loadNews('${data.category_id}');">${data.category_name}</a>`
            menu.appendChild(li);
        }

    }
}

setAllMenu();

const loadNews = async (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
    return data.data;
}

const displayNews = allnews => {
    // console.log(allnews);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allnews.forEach(news => {
        const { title, details, thumbnail_url, rating, author } = news;
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `<div class="card card-side bg-base-100 shadow-xl">
        <figure><img class="h-full w-60" src=${thumbnail_url} alt=""></figure>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${details.length > 200 ? details.slice(0, 200) + '...' : details}</p>
            
            <span class="flex items-center justify-between p-4">
            <span class="flex items-center">
            <img class="rounded-full h-1/12 w-1/12" src=${author.img} alt="">
            <span class="mx-4">${author.name}</span>
            </span>
            <span class="mx-4"><i class="fa-solid fa-eye"></i> <span>${rating.number}</span></span>
            <label for="my-modal-3" onClick="showModal('${title}')" class="btn modal-buttoncard-actions justify-end"><i class="fa-solid fa-arrow-right"></i></label>  
            </span>     
        </div>
    </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
}
const loadNewsDetails = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);
}
const displayNewsDetails = news => {
    console.log(news);
}

const showModal = (title, details) => {
    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = '';
    modalBody.innerHTML = `
    <h3 class="text-lg font-bold">${title}</h3>
    <p class="py-4">${details}</p>`
}