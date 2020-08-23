function tapAnywhereExcept(el, elRotate) {
    document.getElementsByTagName('body')[0].addEventListener("click", function () {
        elRotate.classList.remove('rotate');
        el.classList.remove('scaleY');
    }, false);
    el.addEventListener("click", function (ev) {
        ev.stopPropagation();
    }, false);
}
//scale script
function toggleScaleByClassName(name) {
    document.getElementsByClassName(name)[0].classList.toggle('scale_header');
}
function toggleScaleById(id) {
    document.getElementById(id).classList.toggle('scale_header');
}
function toggleScaleHeightAndRotate(id, rId) {
    document.getElementById(id).classList.toggle('scaleY');
    if(rId)
        document.getElementById(rId).classList.toggle('rotate');
    //tapAnywhereExcept(document.getElementById(id), document.getElementById(rId));
}

//details script
var opened = false;
function toggleDetails() {
    if (!opened) {
        document.getElementById('content_details_header').innerHTML = "скрыть"
        document.getElementById('content_details').style.maxHeight = '440px'
        opened = true
    } else {
        document.getElementById('content_details_header').innerHTML = "подробнее..."
        document.getElementById('content_details').style.maxHeight = '0'
        opened = false
    }
}
//ral script
function mouseOverOn(id) {
    for (x of document.getElementsByClassName(`dobor_inner_${id}`)) { x.style.visibility = 'visible' }

}

function mouseLeaveOf(id) {
    for (x of document.getElementsByClassName(`dobor_inner_${id}`)) { x.style.visibility = 'hidden' }
}
//gallery script
function onImageHuge(path) {
    document.getElementById(`modal_overlay`).style.visibility = 'visible'
    const el = document.getElementById('modal_inner')
    el.src = path;
    el.style.visibility = 'visible'
    document.getElementById(`cross_modal`).style.visibility = 'visible'
}

function closeModal() {
    document.getElementById(`modal_inner`).style.visibility = 'hidden'
    document.getElementById(`cross_modal`).style.visibility = 'hidden'
    document.getElementById('modal_inner_wrapper').style.visibility = 'hidden'
    document.getElementById(`modal_overlay`).style.visibility = 'hidden'
}