/* THIS IS JAVASCRIPT */

function scrollHandler() {
    var scrollTop = document?.documentElement?.scrollTop;

    var element_at = document?.getElementById("at");
    var element_abps = document?.getElementById("abps");
    var element_home = document?.getElementById("home_");
    var element_1 = document?.getElementById("one_text_");
    var element_2 = document?.getElementById("one_text__");
    var element_3 = document?.getElementById("one_text___");
       if (!!element_at || !!element_abps) return;
    var opacity = 0;
    opacity = (scrollTop - 450) / 230;
    element_at.style.opacity = opacity;
    element_abps.style.opacity = opacity;
    var opacity2 = 0;
    opacity2 = 1 - scrollTop / 250;
    element_at.style.opacity = opacity;
    element_abps.style.opacity = opacity;
    element_home.style.opacity = opacity2;

    var top1;
    var top2;
    var top3;

    top1 = (-1/5) * scrollTop + 200;
    top2 = (-1/5) * (scrollTop - 500) + 200;
    top3 = (-1/5) * (scrollTop - 1000) + 200;

    element_1.style.top = top1 + 'px';
    element_2.style.top = top2 + 'px';
    element_3.style.top = top3 + 'px';
 }

window?.addEventListener('scroll', scrollHandler);