(function(){
  const bar = document.getElementById('weekProgress');
  const label = document.getElementById('weekLabel');
  const percent = 60;

  setTimeout(()=>{
    bar.style.width = percent + '%';
    label.textContent = percent + '%';
  }, 160);

  document.querySelectorAll('.fade-in').forEach((el,i)=>{
    el.style.animationDelay = (i*80) + 'ms';
  });
})();