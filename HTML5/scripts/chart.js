(function () {
   function showChart (aChart) {
     console.log('showChart', aChart.id);
     var ppts = aChart.querySelectorAll('table.barchart td:last-child');
     var nums = [];
     for (var i = 0; i < ppts.length; i++) {
       var ppt = ppts[i].querySelector('span');
       if (!ppt)
         continue;
       nums.push(ppt.textContent.replace('%', '') + 0);

       var bar = document.createElement('div');
       bar.classList.add('bar');
       bar.innerHTML = '<div>&nbsp;</div>';
       ppts[i].insertBefore(bar, ppt);
     }

     var normalizeNum = 100.0/Math.max.apply(Math, nums);

     for (var i = 0; i < ppts.length; i++) {
       var ppt = ppts[i].querySelector('span');
       if (!ppt)
         continue;
       var num = ppt.textContent.replace('%', '') + 0;
       var bar = ppts[i].querySelector('div.bar');
       bar.firstChild.style.width = (num * normalizeNum) + '%';
     }
   }

   var charts = document.querySelectorAll('.barchart');
   for (var i=0; i < charts.length;i++)
     showChart(charts[i]);
})();