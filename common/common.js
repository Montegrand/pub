// addEventListener 확장
(function(){
    const resizeObsv = new ResizeObserver((entries)=>{
        entries.forEach((entry)=>{
            entry.target.dispatchEvent((new Event('eleResize')));
        });
    });
    const originalAddEventListener = Element.prototype.addEventListener;

    Element.prototype.addEventListener = function(type, listener, options){
        if(type === 'eleResize'){
            if(!this.dataset.resizeObserved){
                resizeObsv.observe(this);
                this.dataset.resizeObserved = true;
            };
        };
        originalAddEventListener.call(this, type, listener, options);
    };
})();
