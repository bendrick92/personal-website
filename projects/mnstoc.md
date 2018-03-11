---
layout: project
title: "MN ST Owners Club"
image: https://assets.bpwalters.com/images/mnstoc.png
permalink: /projects/mnstoc/
---

<h3>Background</h3>
<p>Minnesota is a great place to be a car nut.  With a huge variety of clubs, associations, and groups, there's no shortage of opportunities to stand around a parking lot and talk about cars!</p>
<p>One specific group I'm regularly involved with is MNSTs.  MNSTs is a grcoup of primarily Ford Focus ST/RS and Fiesta ST owners.  Most of our members are active on our Facebook group, but a number of others don't even have Facebook accounts.  Since we do almost all of our event scheduling on our private Facebook group, making this information accessible to our other members became a problem that needed solving.</p>
<p>I came up with the idea of "scraping" various sources (such as forums, our Facebook wall, etc.) to aggregate member posts/group announcements into a centralized location.  This created a number of unique challenges, mainly figuring out how to scrape forum posts and recognize/render quotes and conversation threads in a readable format, all while keeping performance and load times in check.</p>
<div class="inline-image-wrapper">
    <div style="background-image: url('https://assets.bpwalters.com/images/professional_website/mnstoc_2.jpg');"></div>
</div>
<p>Due to time constraints, lack of use, and difficulty keeping up with Facebook's API changes, I decided to abandon the project after a year or so.  Unfortunately, I didn't think to grab any screenshots of the site fully functioning.</p>
<p>Overall this project was a great learning experience.  In order to scrape the forum content efficiently, I created a Ruby gem (<a href="https://github.com/bendrick92/vbulletin_scraper">vbulletin_scraper</a>).  This was a great opportunity to implement some basic unit testing (using RSpec); something I definitely need to get in the habit of doing more often.  In addition, learning Facebook's API was...enlightening!</p>
<h3>Objectives</h3>
<ul>
    <li>Learn how to scrape forum content</li>
    <li>Learn Facebook's API</li>
    <li>Learn more about Ember SPAs</li>
    <li>Design a fully responsive layout</li>
</ul>
<h3>Links</h3>
<ul>
    <li><a href="https://mnstoc.com/">Website</a></li>
    <li><a href="https://github.com/bendrick92/mn-st-api">Github repo (API)</a></li>
    <li><a href="https://github.com/bendrick92/mn-st-website">Github repo (Ember website)</a></li>
</ul>