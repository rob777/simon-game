(function main() {
    //define global variables
    var computerMoves = [],
        userMoves = [],
        count = 0,
        step = true,
        strictMode = 'yes',
        gameOver = true;

    //turn off or on strict mode
    $('.form input').on('change', function () {
        strictMode = $('input[name="switch"]:checked', '.form').val();
    });

    //start game by pressing START button
    $('.start-btn').on('click', function () {
        newGame();
        $('.msg').text('Ready to play?');
        step = true;
    });

    //handling user input
    $('.circle').on('mousedown', function () {
        if (!gameOver) {
            $(this).addClass('active');
            playSound(this);
            checkClick(this);
        }
    });

    //animate user click
    $('.circle').on('mouseup', function () {
        $(this).removeClass('active');
    });

    //playing sound
    function playSound(e) {
        var sound = new Audio();
        sound.src = $(e).data('value');
        sound.play();
    }

    //lighting up circle
    function lightCircle(e) {
        var $circle = $(e).addClass('active');
        setTimeout(function () {
            $circle.removeClass('active');
        }, 300);
    }


    //generating random number
    function randomNumber() {
        return (Math.floor(Math.random() * 4) + 1);
    }

    //starting new game after lose or reseting game by pressing START button
    function newGame() {
        computerMoves = [];
        userMoves = [];
        count = 0;
        newCount();
        gameOver = false;
    }

    //creats array of computer's moves and makes copy of it to the user array
    function newCount() {
        $('#count').text(++count);
        computerMoves.push(randomNumber());
        userMoves = computerMoves.slice(0);
        showCompMoves(computerMoves);
    }

    //checks if move made by user equals to computer's move and creats boolean variable
    function checkClick(e) {
        var rightMove, realMove;
        if (step) {
            rightMove = userMoves.shift();
            realMove = $(e).attr('id');
            realMove = +realMove;
        }
        step = (rightMove === realMove);
        if (!step && strictMode === 'no') {
            userMoves = computerMoves.slice(0);
            $('.msg').text('Try again!');
            showCompMoves(computerMoves);
            step = true;
        }
        checkAll();
    }

    //function for checking all moves
    function checkAll() {
        if (userMoves.length === 0 && step && count < 20) {
            newCount();
            $('.msg').text('Focus!');
        } else if (count === 20 && step) {
            $('.msg').text('Victory!');
            gameOver = true;
        } else if (!step && strictMode === 'yes') {
            gameOver = true;
            $('.msg').text('Game Over...');
        }
    }

    //show computer moves
    function showCompMoves(moves) {
        var i = 0;
        var move = setInterval(function () {
            var idnt = '#' + moves[i];
            playSound(idnt);
            lightCircle(idnt);
            i++;
            if (i >= moves.length) {
                clearInterval(move);
            }
        }, 600);
    }

})();
