---
layout: post
title: "Arduino OBD-II Carputer"
image: https://assets.bpwalters.com/images/professional_blog/arduino_oled.jpg
---

When I published my [Raspberry Pi OBD-II Carputer](/raspberry-pi-obd-ii-carputer) project a little over a year ago, I could never have expected the overwhelmingly positive response it received.

Through dozens of comments, emails, and even a few in-person discussions at tech conferences, I began to realize there's a much larger market for OBD-II and Raspberry Pi than I first thought.  Most recently, at That Conference in the Wisconsin Dells, I attended a few talks on hacking OBD-II.  Through those sessions, I was able to network with a couple of awesome people who were just as excited about the possibilites of OBD-II + Pi as I am!

Unfortunately, following my original post last June, development on the obdPi project fizzled out.  I quickly realized there were a number of important limitations when considering the Raspberry Pi as a carputer, specifically boot time and power management.

#### Raspberry Pi Limitations

The main issue with my original obdPi approach is the time required to boot the system when the vehicle is powered on.

From a cold start, my best effort bare-bones Raspbian image takes around 20-30 seconds to fully boot.  Due to the many systems and utilities needed to power the obdPi system (Bluetooth, OLED, wireless, etc.), I've struggled to find a way to cut down this boot time.  I've even looked into simulated standby hardware (such as [Sleepy Pi](https://spellfoundry.com/product/sleepy-pi-2/)), but this still relies on the Pi actually *booting* quickly.

The more I thought about the problem, the more I realized the Pi might be overkill for the type of functionality I was trying to achieve.  You see, my original goal was to simply replicate the real-time performance monitoring functionality of the Subaru WRX's multifunction display.

![WRX boost gauge](https://assets.bpwalters.com/images/professional_blog/wrx_boost_gauge.jpg)

With a bit more research, I discovered a great community supporting the Arduino platform.  I dug a bit deeper, and almost immediately the Arduino became an appealing alternative to the Pi; specifically for its simplicity and near-instantaneous boot time.

#### Pi vs. Arduino

When comparing the Pi to the Arduino, they each have their own strengths/weaknesses.

Simply put, the Pi is designed to support a full operating system, but lacks built-in sensors and requires a constant, stable power supply.  On the other hand, the Arduino's strengths include simplicity, extensibility, and incredibly fast boot times.  However, the Arduino lacks the raw power and multi-tasking ability of the Pi.

In the case of obdPi, the ability to extend the functionality of the system beyond basic performance monitoring has always been an appealing option.  However, considering the tradeoff of longer boot times (a major factor in a carputer), the Arudino certainly seemed to fit my needs much better.

#### Exploring Arduino Options

I decided to start by ordering up an [Arduino Uno R3](http://amzn.to/2vW5m6E) from Amazon.  With nothing more than a basic [USB 2.0](http://amzn.to/2ww2EGv) cable and the Arduino IDE on my laptop, I had the little Uno up and running in no time.

I was immediately impressed with how easy to use the Arduino platform is.  Coming from the (often) "trial and error" world of Raspberry Pi, the simplicity of Arduino's IDE and clear, concise tutorials were a breath of fresh air.  In minutes I had a few basic sketches running, and even getting my obdPi 16x2 OLED connected!

![Arduino wired to the OLED](https://assets.bpwalters.com/images/professional_blog/arduino_oled.jpg)

As I started researching existing Arduino OBD-II projects, I came across [Freematics](http://freematics.com/) - a homebrew company that specializes in OBD-II Arduino hardware.  While they offer a number of wired and wireless adapters for OBD-II, I decided to order up one of their [V2 UART Adapters](https://freematics.com/store/index.php?route=product/product&product_id=83).

![Freematics UART V2](...)

#### Freematics Makes It Easy

Utilizing nothing more than the OBD-II interface, the V2 adapter provides a single cable solution for both power and OBD-II data.  Out of the box, it's designed to work with Freematics' [ArduinoOBD](https://github.com/stanleyhuangyc/ArduinoOBD) library.

A basic sketch is as simple as:

```
#include <Wire.h>
#include <OBD.h>

COBDI2C obd;

void setup()
{
  // we'll use the debug LED as output
  pinMode(13, OUTPUT);
  // start communication with OBD-II adapter
  obd.begin();
  // initiate OBD-II connection until success
  while (!obd.init());
}

void loop()
{
  int value;
  // save engine RPM in variable 'value', return true on success
  if (obd.read(PID_RPM, value)) {
    // light on LED on Arduino board when the RPM exceeds 3000
    digitalWrite(13, value > 3000 ? HIGH : LOW);
  }
}
```

As you can see, this is *loads* easier than configuring a Bluetooth OBD-II connection on the Pi.  Plus, having a single cable doing everything is just icing on the cake.

With the easy stuff out of the way, I knew it would be necessary to implement some sort of external display.  Initially I considered re-using the 16x2 OLED from the obdPi project, but realized that would require a whole extra set of cabling to be routed somewhere in the car.

#### Getting in Touch

I pulled back up Freematics' site and noticed they offer a [3.5" Touch LCD Shield](https://freematics.com/store/index.php?route=product/product&path=59&product_id=70) for the Arduino Mega:

![Freematics Touch LCD Shield](...)

Built by DFRobot, this shield is designed to seamlessly integrate with the V2 UART cable; with the necessary male connectors conveniently pre-wired at the base of the display.

While waiting for the LCD to ship, I headed over to my local Microcenter and picked up one of their generic brand Arduino Megas.  (Amazon also stocks [Megas](http://amzn.to/2wVNpHg))

NOTE: You can also order the [LCD Shield + Mega + V2 Cable](https://freematics.com/store/index.php?route=product/product&path=24&product_id=58) as a kit from Freematics, but I found it a bit cheaper to buy the Mega separately.

Once the LCD shield arrived, I put everything together:

![Arduino Mega + Shield setup](https://assets.bpwalters.com/images/professional_blog/arduino_mega_and_shield.jpg)

Thanks to a few sample sketches on the [Freematics Github](https://github.com/stanleyhuangyc/ArduinoOBD), I was up and running in no time!

![Arduino LCD Shield working](https://assets.bpwalters.com/images/professional_blog/arduino_shield_working.jpg)


Freematics had done pretty much all the heavy lifting at this point, and I had a fully functional Arduino OBD-II performance monitor ready for use in the car.  Rather than stop there, however, I decided to dig deeper into the Freematics code and figure out if I could hack the display into a cooler GUI-based layout.

#### COBB Accessport

With obdPi, my original intentions had been to eventually integrate the entire system into my car's dashboard.  However, thanks to the Freematics LCD shield, I realized there was an opportunity to develop a standalone performance monitor similar to COBB Tuning's Accessport.

For those of you who don't know, the Accessport is the go-to device for anyone looking to tune their vehicle's ECU.  Currently on it's third revision, the Accessport (or AP) is designed as an easy way for owners to upload, manage, and monitor various tunes and performance maps for their vehicle.  Much like rooting or jailbreaking an Android or iOS device, cracking a vehicle's ECU provides the opportunity to optimize various parameters for increased performance and/or efficiency.  In addition, the Accessport offers real-time performance monitoring and logging.

![COBB Accessport](...)

While I'm not brave enough to dabble in the dark art of ECU tuning myself, I do see the appeal of having access to real-time performance data, as well as the ability to log this data for later reference.  As such, I decided to take a stab at replicating this functionality using my Arduino setup.

Having already sorted the hardware side of things, I turned my attention to the software.  While Freematics' Arduino scripts already provide a variety of performance data, I wasn't happy with the basic layout and GUI.

#### Gettin' GUI With It

I started by dissecting the example scripts from Freematics' Github repo, and quickly realized there was a significant amount of extraneous code in a number of the libraries.  In addition, while there seemed to be a solid foundation for extended functionality, the original code didn't allow for things like a rotated screen or a page-based layout.

As a result, I spent a good amount of time refactoring and optimizing the base libraries for my specific setup.  In addition, I implemented my own gauge-based layout through a library I decided to call [Mako](https://github.com/bendrick92/Mako.

