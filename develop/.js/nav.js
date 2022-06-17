export function nav () {
  document.querySelector('.header__menu__btn').addEventListener('click', function(){
    document.querySelector('.header__menu__btn').classList.toggle('open');
    document.querySelector('.header__nav').classList.toggle('open');
    document.querySelector('.header__mask').classList.toggle('open');
    });
  document.querySelector('.header__mask').addEventListener('click', function(){
    document.querySelector('.header__menu__btn').classList.toggle('open');
    document.querySelector('.header__nav').classList.toggle('open');
    document.querySelector('.header__mask').classList.toggle('open');
    });
};