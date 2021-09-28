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
    container.addEventListener('dblclick', function(event){
      event.preventDefault;
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
        filterList();

      }
    });
    const filterList = function(){
      const bookList = dataSource.books;
      const covers = document.querySelectorAll(select.bookList.cover);
      console.log('covers', covers);
      console.log('bookList', bookList);
      for(let book of bookList){
        if(filters.includes('nonFiction') && !book.details.nonFiction){
          const bookId = book.id;
          console.log('bookId', bookId);
          // const hiddenElement =
          // console.log('hiddenElement', hiddenElement);
        }
      }
    };
  };




  renderBooks();
  initActions();
}
