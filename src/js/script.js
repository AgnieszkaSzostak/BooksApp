
{
  'use scrict';

  const templates = {
    bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML),

  };

  const select = {
    bookList: {
      container: '.books-list',
      item: '.books-list li',
      cover: '.book__image',
      form: '.filters form',
    }
  };


  class BookList {
    constructor(){
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.renderBooks();
      thisBookList.initActions();
    }
    initData(){
      const thisBookList = this;

      thisBookList.data = dataSource;
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
    }
    getElements(){
      const thisBookList = this;

      thisBookList.dom = {};
      thisBookList.dom.bookListContainer = document.querySelector(select.bookList.container);
      thisBookList.dom.form = document.querySelector(select.bookList.form);
    }
    renderBooks(){
      const thisBookList = this;

      for(let book of thisBookList.data.books) {
        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;
        const generatedHTML = templates.bookList(book);
        const preparedHTML = utils.createDOMFromHTML(generatedHTML);
        thisBookList.dom.bookListContainer.appendChild(preparedHTML);
      }
      thisBookList.filterBooks();
    }
    determineRatingBgc(rating){

      if (rating < 6){
        return `linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);`;
      }
      if (rating > 6 && rating <= 8){
        return `linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);`;
      }
      if (rating > 8 && rating <= 9){
        return `linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);`;
      }
      if (rating > 9){
        return `linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);`;
      }
    }
    filterBooks(){
      const thisBookList = this;

      for (let book of thisBookList.data.books){
        const bookImage = document.querySelector(`.book [data-id="${book.id}"]`);
        const shouldBookBeHidden = thisBookList.filters.some(filter => book.details[filter]);
        bookImage && shouldBookBeHidden
          ? bookImage.classList.add(`hidden`)
          : bookImage.classList.remove(`hidden`);
      }
    }
    initActions(){
      const thisBookList = this;

      thisBookList.dom.bookListContainer.addEventListener('click', function(event){
        event.preventDefault();
      });
      thisBookList.dom.bookListContainer.addEventListener('dblclick', function(event){
        event.preventDefault();

        const clickedElementParent = event.target.offsetParent;
        if(clickedElementParent.classList.contains('book__image')){
          const coverId = clickedElementParent.getAttribute('data-id');
          if(!thisBookList.favoriteBooks.includes(coverId)){
            clickedElementParent.classList.add('favorite');
            thisBookList.favoriteBooks.push(coverId);
          }
          else{
            clickedElementParent.classList.remove('favorite');
            const index = thisBookList.favoriteBooks.indexOf(coverId);
            thisBookList.favoriteBooks.splice(index, 1);
          }
        }
      });

      thisBookList.dom.form.addEventListener('click', function(event){
        const clickedElement = event.target;
        if(clickedElement.name == 'filter' &&
          clickedElement.type == 'checkbox' &&
          clickedElement.tagName == 'INPUT' ){
          if(clickedElement.checked){
            thisBookList.filters.push(clickedElement.value);
          }
          else{
            const index = thisBookList.filters.indexOf(clickedElement.value);
            thisBookList.filters.splice(index, 1);
          }
          thisBookList.filterBooks();
        }
      });
    }
  }
  const app = new BookList();
  console.log('app: ', app);
}


