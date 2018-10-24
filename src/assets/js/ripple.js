const cssTransitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd'
const cssAnimationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend'

document.addEventListener('click', function (event) {

    let that = event.target.closest('.ripple') || event.target.closest('.btn')
    if(event.target.className.indexOf('ripple') > 0 || event.target.className.indexOf('btn') > 0) that = event.target

    if(!that) return;

    let inkNode, d, x, y

    inkNode = that.querySelector('.ink')
    if(!inkNode) {
        inkNode = document.createElement('span')
        inkNode.className = "ink"
        that.prepend(inkNode)
    }

    inkNode.classList.remove('animate')

    if(!inkNode.offsetHeight || !inkNode.offsetWidth){
        d = Math.max(that.offsetWidth, that.offsetHeight)
        inkNode.style.height = d+'px'
        inkNode.style.width = d+'px'
    }

    rect = that.getBoundingClientRect()
    x = event.pageX - rect.left - inkNode.offsetWidth/2
    y = event.pageY - rect.top - inkNode.offsetHeight/2
    inkNode.style.top = y+'px'
    inkNode.style.left = x+'px'

    inkNode.classList.add('animate')


    that.addEventListener(cssAnimationEnd, () => {
        inkNode.remove()
    })

})