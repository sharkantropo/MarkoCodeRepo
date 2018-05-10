/*jshint esversion: 6 */

// pomodoroClock
const pomodoroClock = {
  break_time: "#sub_ele_5",
  sess_time: "#sub_ele_2",
  breakT: "#elem_3",
  sessT: "#elem_1",
  addOne: ".plusle",
  sustOne: ".minun"
};
var flag = true, is_start=true;

var set_timer = Object.create(pomodoroClock);

set_timer.defaultVal = function () {
  $(this.break_time).html("B<br>05");
  $(this.sess_time).html("S<br>25");
};
set_timer.addValue = function () {
  let curValbreak = $(this.break_time).html();
  let curValsess = $(this.sess_time).html();
  curValbreak=curValbreak.slice(-2);
  curValsess=curValsess.slice(-2);
  $(this.breakT + ">" + this.addOne).click(function () 
  {
    curValbreak = parseInt(curValbreak);
    if(curValbreak<99)
    {
      curValbreak += 1;
     }
     if(curValbreak<10)
     {
       curValbreak="0"+curValbreak;
     }
    $(set_timer.break_time).html("B<br>"+curValbreak);
  });
  $(this.breakT + ">" + this.sustOne).click(function () {
    curValbreak = parseInt(curValbreak);
    if (curValbreak >= 2) 
    {
      curValbreak -= 1;
    }
    if(curValbreak<10)
    {
      curValbreak="0"+curValbreak;
    }
    $(set_timer.break_time).html("B<br>"+curValbreak);
  });
  $(this.sessT + ">" + this.sustOne).click(function () {
    curValsess = parseInt(curValsess);
    if (curValsess >= 2) {
      curValsess -= 1;
    }
    if(curValsess<10)
    {
      curValsess="0"+curValsess;
    }
    $(set_timer.sess_time).html("S<br>"+curValsess);
    if (is_start) 
    {
      $("#scr_disp").html(curValsess + ":" + "00" + "<div id=\"status\">session</div>"); 
     }
  });
  $(this.sessT + ">" + this.addOne).click(function () {
    curValsess = parseInt(curValsess);
    if(curValsess<99)
    {
      curValsess += 1;
    }
    if(curValsess<10)
    {
      curValsess="0"+curValsess;
    }
    $(set_timer.sess_time).html("S<br>"+curValsess);
    if (is_start) 
    {
      $("#scr_disp").html(curValsess + ":" + "00" + "<div id=\"status\">session</div>"); 
    }
  });
};
set_timer.initNset = function () {
  set_timer.defaultVal();
  set_timer.addValue();
  $("#scr_disp").html("25" + ":" + "00" + "<div id=\"status\">session</div>");
};

var click_clock = Object.create(pomodoroClock);

click_clock.set_countdown = function () 
{
  $("#pushed").click(function () {
    var ringer = $("#ring_ring")[0], m, s, c_status="<div id=\"status\">session</div>";
    let togg;
    is_start= false;
    ringer.volume = 0.2;
    if (flag) {
      m = $(click_clock.sess_time).html();
      m=m.slice(-2);
      s = "00";
      togg = false;
      $(this).html("RESET");
      flag = !flag;
      // To clear setInverval correctly, It should be set in global scope.
      timerPomo = setInterval(function () 
      {
        if (s == "00") 
        {
          m = parseInt(m);
          if (m > 0) 
          {
            m--;
          }
          s = 60;
        }
        s = parseInt(s);
        s--;
        if (s < 10) 
        {
          s = "0" + s;
        }
        $("#scr_disp").html(m + ":" + s+ c_status);
        if (m == 0 && s == "00") 
        {
          if (!togg) {
            ringer.play();
            m = $(click_clock.break_time).html();
            c_status="<div id=\"status\">break time!</div>";
            m=m.slice(-2);
            togg = !togg;
          } else {
            ringer.play();
            m = $(click_clock.sess_time).html();
            c_status="<div id=\"status\">session</div>";
            m=m.slice(-2);
            togg = !togg;
          }
        }
      }, 1010);
    } 
    else {
      $(this).html("START");
      is_start= true;
      flag = !flag;
      set_timer.initNset();
      m = $(click_clock.sess_time).html();
      m=m.slice(-2);
      s = "00";
      clearInterval(timerPomo);
      $("#scr_disp").html(m + ":" + s + "<div id=\"status\">session</div>");
    }
  });
};

$(document).ready(function () {
  set_timer.initNset();
  click_clock.set_countdown();
});
