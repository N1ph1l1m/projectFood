"use strict";

window.addEventListener("DOMContentLoaded", () => {
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

  const deadLine = "2023-06-17";

    function getTimeRemaining(endtime){
      const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t/ ( 1000 * 60 * 60 * 24 )),
          hours = Math.floor((t / (1000 * 60 * 60)% 24)),
          minutes = Math.floor((t / 1000 / 60 )% 60),
          seconds = Math.floor((t / 1000)% 60);

        return{
          'total':t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds

        };
    }
    function getZero(num){
      if(num>=0 && num<10 ){
         return `0${num}`; 
      }else{
        return num;

      }
    }

    function setClock(selector, endtime){
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock,1000)
         
            updateClock();

            function updateClock(){
              const t = getTimeRemaining(endtime);

              days.innerHTML = getZero(t.days);
              hours.innerHTML =getZero(t.hours);
              minutes.innerHTML = getZero(t.minutes);
              seconds.innerHTML = getZero(t.seconds);
                
              if(t.total<= 0){
                clearImmediate(timeInterval);
              }
         }   
    }

    setClock('.timer',deadLine); 
});
