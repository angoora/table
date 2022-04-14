function responsiveTable(arg) { //가변 테이블
  if ($(window).width() < arg) {     
    $('.tableA:not(.mbT) tbody th').each(function () {
      if (!$(this).next('td[colspan]').length) {
        $(this).addClass('hidden');
        var td = $(this).next('td');
        td.wrapInner('<div></div>');
        $(this).clone().prependTo(td).contents().unwrap().wrap('<span class="th"></span>');
      }
    }); 
    $('.tableA').addClass('mbT');   
  }
  else {
    $('.tableA.mbT tbody th').each(function () {
      if (!$(this).next('td[colspan]').length) { 
        $(this).removeClass('hidden');        
        $(this).next().find('.th').remove();        
        $(this).next().children('div').contents().unwrap();
      }     
    });
    $('.tableA').removeClass('mbT');
  }

  if ($(window).width() < arg) {
    //tbody n번째 td에 thead n번째 th 텍스트를 span태그를 감싸 넣는다.
    $('.tableB:not(.mbT)').each(function () {
      var th = $(this).find('thead th');
      var cols = th.length;
      var rows = $(this).find('tbody tr').length;
      for (var i = 0; i < rows;i++) { 
        for (var j = 0; j < cols; j++) {
          var td = $(this).find('tbody tr').eq(i).children().eq(j);                    
          td.wrapInner('<div></div>');
          th.eq(j).clone().prependTo(td).contents().unwrap().wrap('<span></span>')
        }
      }     
      $(this).addClass('mbT');
    });    
  } else {
    $('.tableB.mbT').each(function () { 
      $(this).find('tbody td > span').remove();
      $(this).find('tbody td > div').contents().unwrap();
      $(this).removeClass('mbT');
    });  
  }  
}
//스크롤바 width 구하기
function getScrollWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}
//y스크롤 발생 테이블 thead고정
function fxTable(arg) {
  $('.table.fx-hd').each(function () {
    var theadH = $(this).find('thead').outerHeight();
    var tdH = $(this).find('tbody td').outerHeight();
    var maxHeight = $(this).data('row') * tdH + theadH;
    $(this).find('table').clone().prependTo(this).addClass('clone-tb').attr('tabindex', '-1').next('table').wrap('<div class="scr-y" style="max-height:' + maxHeight + 'px"></div>');
    $(this).find('.clone-tb').css('width', 'calc(100% - ' + arg + 'px)');
  });  
}
$(function () {
  fxTable(getScrollWidth());
});

$(window).on('load resize', function () {
  responsiveTable(1080);
});