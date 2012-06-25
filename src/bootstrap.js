_.mixin({
    sample: function(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
});
