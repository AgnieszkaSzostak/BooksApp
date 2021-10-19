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
    }
  };

  const renderBooks = function(){
    for(let book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      book['ratingBgc'] = ratingBgc;
      book['ratingWidth'] = ratingWidth;
      const generatedHTML = templates.bookList(book);
      select.bookList.item = utils.createDOMFromHTML(generatedHTML);
      const bookListContainer = document.querySelector(select.bookList.container);
      bookListContainer.appendChild(select.bookList.item);
    }
  };


  const favoriteBooks = [];
  const filters = [];
  const initActions = function(){
    const container = document.querySelector(select.bookList.container);
    const form = document.querySelector('.filters form');
    container.addEventListener('click', function(event){
      event.preventDefault();
    });
    container.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElementParent = event.target.offsetParent;
      if(clickedElementParent.classList.contains('book__image')){
        const coverId = clickedElementParent.getAttribute('data-id');
        if(!favoriteBooks.includes(coverId)){
          clickedElementParent.classList.add('favorite');
          favoriteBooks.push(coverId);
        }
        else{
          clickedElementParent.classList.remove('favorite');
          const index = favoriteBooks.indexOf(coverId);
          favoriteBooks.splice(index, 1);
        }
      }
    });
    form.addEventListener('click', function(event){
      event.preventDefault;
      const clickedElement = event.target;
      console.log('event.target/form:', event.target);
      if
      (clickedElement.name == 'filter' &&
      clickedElement.type == 'checkbox' &&
      clickedElement.tagName == 'INPUT' ) {
        console.log('clickedElement.value:', clickedElement.value);
        if(clickedElement.checked){
          filters.push(clickedElement.value);
          console.log('filters', filters);
        }
        else{
          const index = filters.indexOf(clickedElement.value);
          filters.splice(index, 1);
          console.log('filters', filters);
        }
        filterBooks();

      }
    });
    const filterBooks = function(){
      dataSource.books.forEach(book => {
        const filteredBook = document.querySelector(`.book [data-id="${book.id}"]`);
        const shouldBookBeHidden = filters.some(filter => !book.details[filter]);
        filteredBook && shouldBookBeHidden
          ? filteredBook.classList.add(`hidden`)
          : filteredBook.classList.remove(`hidden`);
      });
    };
  };

  const determineRatingBgc = function(rating){
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

  };




  renderBooks();
  initActions();
}
