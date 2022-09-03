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
            li.innerHTML = `<a onClick="loadNews('${data.category_id}');">${data.category_name}</a>`
            menu.appendChild(li);
        }

    }
}
setAllMenu();
const loadNews = async (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}
