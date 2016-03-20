/* general setup */
var fadeTime = 400

var getActiveID = function(){
  return $(".active").attr("id")
}
var getActiveBook = function(){
  return $("figure").filter("."+getActiveID())
}

var removeActive = function(){
  getActiveBook().fadeOut( fadeTime )
  return $(".active").removeClass("active")
}

var setActive = function(){
  $(this).attr("class","active")
  window.setTimeout(function(){ // wait for fadeOut
    getActiveBook().fadeIn( fadeTime * 4/3 )}
    , fadeTime * 1.01
  )
  return this
}
$.fn.extend({
  setActive: setActive
})

var getNextToActive = function(){
  if($(".active").length === 0){
    alert("No active book")
    return false
  }
  var nextOne = $(".active").next()
  // if last-child and no nextOne, set nextOne to first-child
  if (nextOne.length === 0) {
    var nextOne = $(".active").parent().children().first()
  }
  return nextOne
}

var getPrevToActive = function(){
  if($(".active").length === 0){
    alert("No active book")
    return false
  }
  var prevOne = $(".active").prev()
  // if first-child and no prevOne, set prevOne to last-child
  if (prevOne.length === 0) {
    var prevOne = $(".active").parent().children().last()
  }
  return prevOne
}

/* navigation functions */
var next = function(){
  var nextBook = getNextToActive()
  removeActive()
  nextBook.setActive()
}

var prev = function(){
  var prevBook = getPrevToActive()
  removeActive()
  prevBook.setActive()
}

var goTo = function(){
  removeActive()
  return $(this).setActive()
}

/* play and pause event setup */
var firstClick = true,
    sliding = false       // IntervalID
var removePlayOverlay = function(){
  firstClick = false
  $(".overlay").css("background-image", "none")
}
var hidePlayButton = function(){
  $("#buttons li.play").css("opacity",0)
}
var showPlayButton = function(){
  $("#buttons li.play").css("opacity",1)
}

/* jQuery.ready */
$(function(){
  /* click event on figure logic */
  $(".slider").click(function(){
    if(firstClick){
      removePlayOverlay()
      $("#nav").children().first().trigger("click")
    }
    
    if(!sliding){
      sliding = window.setInterval( next, 5000 )
      hidePlayButton()
    } else if (sliding){
      clearInterval(sliding)
      sliding = false
      showPlayButton()
    }
  })

  /* click event on nav and buttons logic */
  $("#nav").children()
    .click( function(){
      if(firstClick){ removePlayOverlay(); showPlayButton() }
    })
    .click( goTo )
  $(".prev").click( prev )
  $(".next").click( next )
  $(".play").click(function(){
    sliding = window.setInterval( next, 5000 )
    hidePlayButton()
  })
})