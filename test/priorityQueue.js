function  PriorityQueue(){
    let items=[];

    function QueueElement(element,priority){
        this.element=element;
        this.priority=priority;
    }

    this.enqueue=function(element,priority){
        let queueElement=new QueueElement(element,priority);

        if(this.isEmpty()){
            items.push(queueElement);
        }else{
            var added=false;//利用flag，计数器也可
            for(let i=0;i<items.length;i++){
                if(priority>items[i].priority){
                    items.splice(i,0,queueElement);
                    added=true;
                    break;//注意break；
                }
            }
            if(!added){
                items.push(queueElement);
            }
        }
    }

    this.dequeue=function(){
        return items.shift();
    }

    this.front=function(){
        return items[0];
    }

    this.isEmpty=function(){
        return items.length===0;
    }

    this.clear=function(){
        items=[];
    }
    
    this.size=function(){
        return items.length;
    }

    this.print=function(){
        console.log(items.toString());
    }
}