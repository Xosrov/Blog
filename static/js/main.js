"use strict"
let cssVariables = [
    "--main_bg_1",
    "--main_bg_2",
    "--text_1",
    "--text_2",
    "--other"
]
let nightColors = [
    "#1d3557",
    "#457b9d",
    "#a8dadc",
    "#f1faee",
    "rgb(201, 130, 0)"
];
let dayColors = [
    "#f4f1de",
    "#e07a5f",
    "#3d405b",
    "#2a9d8f",
    "#f2cc8f"
];

function isOnScreen(element) {
    var curPos = element.offset();
    var curTop = curPos.top;
    var screenHeight = $(window).height();
    return (curTop > screenHeight) ? false : true;
}

function updatePage() {
    let baseWidth = 60; //vh unit
    if ($(window).width() < 600)
        baseWidth = 50;
    if ($("#night").is(":checked")) {
        for (let i = 0; i < cssVariables.length; i++) {
            document.documentElement.style.setProperty(cssVariables[i], nightColors[i]);
        }
    } else if ($("#day").is(":checked")) {
        for (let i = 0; i < cssVariables.length; i++) {
            document.documentElement.style.setProperty(cssVariables[i], dayColors[i]);
        }
    }
    let page = 1;
    let loadedProficiencies = false;
    $(".first_page .main").scroll(function () {
        if (loadedProficiencies)
            return;
        loadedProficiencies = true;
        let widthslice = (baseWidth - 16) / 10;
        proficiencySlider(".proficiencies > * > div", widthslice);
    });
    $("#day").change(function () {
        for (let i = 0; i < cssVariables.length; i++) {
            document.documentElement.style.setProperty(cssVariables[i], dayColors[i]);
        }
    });
    $("#night").change(function () {
        for (let i = 0; i < cssVariables.length; i++) {
            document.documentElement.style.setProperty(cssVariables[i], nightColors[i]);
        }
    });
    $(".more_info_container").hover(function () {
        verticalAnim('.vertical_scrollbar div', 80);
        if (page != 1)
            $(".vertical_scrollbar > *").css("background-color", "var(--other)");
        else
            $(".vertical_scrollbar > *").css("background-color", "var(--main_bg_2)");
    }, function () {
        verticalAnim('.vertical_scrollbar div', 1 / 80);
        $(".vertical_scrollbar > *").css("background-color", "var(--main_bg_2)");
    });
    $("#page_2").hover(function () {
        if (page == 1) {
            $(".second_page").css("right", -baseWidth + 2 + "vh");
            $(".first_page").css("left", "-2vh");
        } else {
            $(".first_page").css("left", -baseWidth + 2 + "vh");
            $(".second_page").css("right", "-2vh");
        }
    }, function () {
        if (page == 1) {
            $(".second_page").css("right", -baseWidth + "vh");
            $(".first_page").css("left", "0");
        } else {
            $(".second_page").css("right", "0");
            $(".first_page").css("left", -baseWidth + "vh");
        }
    });
    $("#page_3").hover(function () {
        if (page == 1) {
            $(".third_page").css("left", -baseWidth + 2 + "vh");
            $(".first_page").css("left", "2vh");
        } else {
            $(".third_page").css("left", "-2vh");
            $(".first_page").css("left", baseWidth - 2 + "vh");
        }
    }, function () {
        if (page == 1) {
            $(".third_page").css("left", -baseWidth + "vh");
            $(".first_page").css("left", "0");
        } else {
            $(".first_page").css("left", baseWidth + "vh");
            $(".third_page").css("left", "0");
        }
    });
    $("#page_2").click(function () {
        if (page == 1) {
            page = 2
            $(".first_page").css("left", -baseWidth + "vh");
            $("#page_2").css("right", baseWidth / 2 - 3 + "vh");
            $("#page_2").html("Back");
            $("#page_3").css("left", -baseWidth + "vh");
            $(".second_page").css("right", "0");
            $(".basic_info_name").css("color", "var(--text_2)");
            $(".horizontal_scrollbar_r > *").css("background-color", "var(--other)");
            horizontalAnim('.horizontal_scrollbar_r div', 2, 'easeOutCubic');
            slide("#page_2");
        } else {
            $("#page_2").css("right", "2vh");
            $("#page_2").html("Contact");
            $("#page_3").css("left", "2vh");
            $(".second_page").css("right", -baseWidth + "vh");
            $(".first_page").css("left", "0");
            $(".basic_info_name").css("color", "var(--other)");
            $(".horizontal_scrollbar_r > *").css("background-color", "var(--main_bg_2)");
            horizontalAnim('.horizontal_scrollbar_r div', 3, 'linear');
            slide("#page_2");
            page = 1;
        }
    });
    $("#page_3").click(function () {
        if (page == 1) {
            page = 3
            $(".first_page").css("left", baseWidth + "vh");
            $("#page_3").css("left", baseWidth / 2 - 3 + "vh");
            $("#page_3").html("Back");
            $("#page_2").css("right", -baseWidth + "vh");
            $(".third_page").css("left", "0");
            $(".basic_info_name").css("color", "var(--text_2)");
            $(".horizontal_scrollbar_l > *").css("background-color", "var(--other)");
            horizontalAnim('.horizontal_scrollbar_l div', 3, 'easeOutCubic');
            slide("#page_3");
        } else {
            $("#page_3").css("left", "2vh");
            $("#page_3").html("Experience");
            $("#page_2").css("right", "2vh");
            $(".third_page").css("left", -baseWidth + "vh");
            $(".first_page").css("left", "0");
            $(".basic_info_name").css("color", "var(--other)");
            $(".horizontal_scrollbar_l > *").css("background-color", "var(--main_bg_2)");
            horizontalAnim('.horizontal_scrollbar_l div', 2, 'linear');
            slide("#page_3");
            page = 1;
        }
    });
}
var windowWidth;
var windowHeight;
$(document).ready(function () {
    $("#noscript").remove();
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    updatePage();
});
$(window).resize(function () {
    if (windowWidth != $(window).width() || windowHeight != $(window).height()) {
        location.reload();
    }
});

function verticalAnim(targets, scale) {
    anime({
        targets: targets,
        scaleY: scale,
        duration: 700,
        easing: 'cubicBezier(0.25, 0.1, 0.25, 1.0)',
        delay: anime.stagger(20, {
            from: 'center'
        })

    });
}

function horizontalAnim(targets, dir, ease) {
    anime({
        targets: targets,
        translateX: (dir == 2) ? "-62vh" : "62vh",
        duration: 500,
        scaleX: [10, 1],
        easing: ease,
        delay: anime.stagger(20, {
            from: 'center'
        })
    });
}

function slide(targets) {
    anime({
        targets: targets,
        duration: 750,
        scaleX: [3, 1],
        easing: 'easeInOutExpo',
    });
}

function proficiencySlider(targets, widthSlice) {
    anime({
        targets: targets,
        width: function (element, i, l) {
            let score = $(element).attr("class");
            return score * widthSlice + "vh";
        },
        duration: 750,
        delay: anime.stagger(150),
        easing: 'easeInOutQuart'
    });
}