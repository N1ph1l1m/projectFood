"use strict";

window.addEventListener("DOMContentLoaded", () => { 
  //Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    calcChooseParent = document.querySelector(".calculating__field"),
    calcChooseItem = document.querySelectorAll(".calculating__choose-item"),
    calcChooseItemPhysActivity = document.querySelectorAll(
      ".calculating__choose-itemPhysActivity"
    ),
    tabsContent = document.querySelectorAll(".tabcontent"),
    calcChooseParentPhysActivity = document.querySelector(
      ".calculating__choose_physActivity"
    ),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  function hidecalcChoose() {
    calcChooseItem.forEach((item) => {
      item.classList.remove("calculating__choose-item_active");
    });
  }

  function showcalcChoose(i = 0) {
    calcChooseItem[i].classList.add("calculating__choose-item_active");
  }

  function hidecalcChooseActivity() {
    calcChooseItemPhysActivity.forEach((item) => {
      item.classList.remove("calculating__choose-item_active");
    });
  }

  function showcalcChooseActiviyt(i = 0) {
    calcChooseItemPhysActivity[i].classList.add(
      "calculating__choose-item_active"
    );
  }

  hidecalcChoose();
  hidecalcChooseActivity();
  showcalcChoose(0);
  showcalcChooseActiviyt(0);

  calcChooseParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("calculating__choose-item")) {
      calcChooseItem.forEach((item, i) => {
        if (target == item) {
          hidecalcChoose();
          showcalcChoose(i);
        }
      });
    }
  });

  calcChooseParentPhysActivity.addEventListener("click", (event) => {
    const target = event.target;

    if (
      target &&
      target.classList.contains("calculating__choose-itemPhysActivity")
    ) {
      calcChooseItemPhysActivity.forEach((item, i) => {
        if (target == item) {
          hidecalcChooseActivity();
          showcalcChooseActiviyt(i);
        }
      });
    }
  });

  //Timer

  const deadLine = "2025-02-18";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearImmediate(timeInterval);
      }
    }
  }

  setClock(".timer", deadLine);

  //Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute('data-close')=== '') {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

    function showModalByScroll(){
      if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();
        window.removeEventListener('scroll',showModalByScroll);
      }
    }

   window.addEventListener('scroll', showModalByScroll);

  class MenuCard {
    constructor(src, alt, title, desc, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.titel = title;
      this.desc = desc;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToRus();
    }

    changeToRus() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      this.classes.forEach((className) => element.classList.add(className));
      element.innerHTML = `
        <img  src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.titel}</h3>
        <div class="menu__item-descr">${this.desc}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> р/день</div>
        </div>
    `;
      this.parent.append(element);
    }

  }
  const getResourse  =  async(url) =>{
    const res =  await fetch(url);
    if(!res.ok){
       throw new Error(`Could not fetch ${utl} , status: ${res.status}`);
    }
    return await res.json();
  };

  getResourse('http://localhost:3333/menu')
    .then(data =>{
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price,'.menu .container').render();
      });
  });

  

    //Forms
    const forms = document.querySelectorAll("form");

    const message = { 
      loading: "img/form/spinner.svg",
      success: "Thanks! Soon we are callback you",
      failure: "Wtf...., whats wrong",
    };

    forms.forEach(item => {
      bindPostData(item);
    });
    //post data first version
      /*
      function bindPostData(form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();

          const statusMessage = document.createElement('div');
          statusMessage.classList.add('status');
          statusMessage.textContent = message.loading;
          form.append(statusMessage);

          const request = new XMLHttpRequest();
          request.open('POST','server.php');

          //request.setRequestHeader("Content-type", "multipart/form-data");
          const formData = new FormData(form);

          request.send(formData);


          request.addEventListener('load', () => {
            if (request.status === 200) {
              console.log(request.response);
              statusMessage.textContent = message.success;
              form.reset();
      
              setTimeout(() => {
                statusMessage.remove();
              },2000 );
            } else {
              statusMessage.textContent = message.failure;
            }
          });
        });
      }
      */
    
    //form json  
    /*
    function bindPostData(form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText= `
        display:block;
        margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend',statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST','server.php');

        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const object ={};
        formData.forEach(function(value,key){
          object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);


        request.addEventListener('load', () => {
          if (request.status === 200) {
            console.log(request.response);
            showThanksModal(message.success);
            form.reset();
            statusMessage.remove();
          } else {
            showThanksModal(message.failure);
          }
        });
      });
    }
  */

    // form json - version 3 
   
    /*
        function bindPostData(form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();

          const statusMessage = document.createElement('img');
          statusMessage.src = message.loading;
          statusMessage.style.cssText= `
          display:block;
          margin: 0 auto;
          `;
          form.insertAdjacentElement('afterend',statusMessage);

        

          const formData = new FormData(form);

          fetch('server.php',{
            method:'POST',
            headers:{
              'Content-type' : "application/json"
            },
            body:formData
          }).then(data =>{
                console.log(data);
                showThanksModal(message.success);
        
                statusMessage.remove();
          }).catch(()=>{
            showThanksModal(message.failure);
          }).finally(()=>{
            form.reset();
          })

          const object ={};
          formData.forEach(function(value,key){
            object[key] = value;
          });

          const json = JSON.stringify(object);
        });
      }
  */
      
  
  const postData =  async(url, data) =>{
  const res =  await fetch(url,{
    method:'POST',
    headers:{
      'Content-type' : "application/json"
    
    },
    body: data
  });
  return await res.json();
  };


  //post data version 4 
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText= `
      display:block;
      margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend',statusMessage);

    

      const formData = new FormData(form);
      
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
    

      postData(' http://localhost:3333/requests',json)
      .then(data =>{
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(()=>{
        showThanksModal(message.failure);
      }).finally(()=>{
        form.reset();
      });
    });
  }

  function showThanksModal(message){
    const prevModalDialog = document.querySelector(".modal__dialog ");

    prevModalDialog.classList.add('hide');
    openModal();

    const thankModal = document.createElement('div');
    thankModal.classList.add('modal__dialog');
    thankModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>x</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thankModal);
    setTimeout(() => {
      thankModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    },1500);
  }
  fetch('/server/db.json',)
    .then(data => data.json())
    .then (res => console.log(res))
  
    //Slider
    //first version 
    /*
    const slides  = document.querySelectorAll('.offer__slide'),
    prev  = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current');
    let slideIndex = 1;

    showSlides(slideIndex);

    if(slides.length<10){
      total.textContent = `0${slides.length}`
    }else{
      total.textContent = slides.length;
    }

    function showSlides(n){
      if(n > slides.length){
        slideIndex = 1;
      }

      if(n < 1){
        slideIndex = slides.length;
      }

      slides.forEach(item => item.style.display = 'none');

      slides[slideIndex - 1].style.display = 'block';

      if(slides.length<10) {
        current.textContent = `0${slideIndex}`;
      }else{
        current.textContent = slideIndex;
      }

    }

    function plusSlides(n){
        showSlides(slideIndex += n);
    }
    prev.addEventListener('click',() =>{
      plusSlides(-1);
    });

    next.addEventListener('click',() =>{
      plusSlides(1);
    });
    */
    
    //second version
    const slides  = document.querySelectorAll('.offer__slide'),
    prev  = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slideField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offSet = 0;

    slideField.style.width = 100 * slides.length +'%';
    slideField.style.display = 'flex';
    slideField.style.transition = '0.9s all';

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide =>{
      slide.style.width = width;
    });
    next.addEventListener('click', () =>{
      if(offSet == +width.slice(0,width.length - 2) * (slides.length - 1)){
        offSet = 0;
      }else{
        offSet += +width.slice(0,width.length - 2);
      }

      slideField.style.transform = `translateX(-${offSet}px)`;
    });

    prev.addEventListener('click', () =>{
      if(offSet == 0){
        offSet = +width.slice(0,width.length - 2) * (slides.length - 1);
      }else{
        offSet -= +width.slice(0,width.length - 2);
      }

      slideField.style.transform = `translateX(-${offSet}px)`;
    });

  

    
});
