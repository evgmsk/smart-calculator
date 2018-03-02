class SmartCalculator {
    constructor(initialValue){
        this.value = initialValue;
        this.queue = [];
        this.values = [];
    }

    valueOf(){
        return this.execute()
    }

    add(number){
        this.queue.push('a');
        this.values.push(number);
        return this
    }

    subtract(number){
        this.queue.push('s');
        this.values.push(number);
        return this
    }

    multiply(number){
        this.queue.push('m');
        this.values.push(number);
        return this
    }

    devide(number){
        this.queue.push('d');
        this.values.push(number);
        return this
    }

    pow(number){
        this.queue.push('p');
        this.values.push(number);
        return this

    }

    actions(action, i) {
        switch(action) {
            case 'a':
                this.value += this.values[i];
                return true;
            case 's':
                this.value -= this.values[i];
                return true;
            case 'm':
                if(i > 0)
                    this.values[i - 1] *= this.values[i];
                else
                    this.value *= this.values[i];
                return true;
            case 'd':
                if(i > 0)
                    this.values[i - 1] = this.values[i - 1]/this.values[i];
                else
                    this.value = this.value/this.values[i];
                return true;
            case 'p':
                if(i > 0)
                    this.values[i - 1] = Math.pow(this.values[i - 1], this.values[i]);
                else
                    this.value = Math.pow(this.value, this.values[i]);
                return true;
            default:
                return false
        }
    }

    execute(){
        let index = -1;
        let action = '';
        let m = this.queue.indexOf('m');
        let d = this.queue.indexOf('d');
        let seq = [m, d].filter(x => x > -1? x: false).sort((a, b) => a - b);
        let p = this.queue.reduce((arg, x, i) => {
            if(x === 'p'){
                arg = [ ...arg, i]
            }
            return arg
        }, []);
        if(p.length)
            index = p.pop();
        else if(seq.length)
            index = seq.shift();
        else{
            index = 0;
        }
        action = this.queue[index];
        this.actions(action, index);
        this.queue.splice(index, 1);
        this.values.splice(index, 1);
        return this.queue.length? this.execute(): this.value
    }
}

module.exports = SmartCalculator;
