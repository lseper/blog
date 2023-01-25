---
title: 'The Mathematics of Mariokart Tournaments'
excerpt: 'Why designing a fair and fun tournament for one of Nintendos most iconic franchises is harder than you think.'
coverImage: '/assets/blog/mariokart-tournament/mk8-deluxe-cover-art.jpeg'
date: '2023-01-23T05:35:07.322Z'
author:
  name: 'Liam Seper'
  picture: '/assets/blog/authors/liam.jpg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

If you're reading this blog, you've probably heard of [Mariokart](https://en.wikipedia.org/wiki/Mario_Kart). Since 1992, people around the world have been able to compete in a fun, casual racing game featuring Nintendo's favorite characters, from Mario to Link. The game's simple premise, easy controls, and (somewhat unfair) items make for memorable gameplay that all ages can enjoy.

See, my friends and I LOVE this game. We've dumped hours upon hours playing together, competing in time trials, and joining online matches together. When we found out that our college was hosting a campus-wide tournament for the game, we eagerly jumped at the opportunity to compete. We were excited to compete in the fun, chaotic 4v4 matchups in the tournament that Mariokart lended itself so great to.

However when we arrived, we realized this wasn't how the tournament was set up at all. Instead, they did a traditional 1-on-1 matchup, and used a single elimination bracket. This was not nearly as fun.

Even worse was the fact that it was a single elimination bracket. You see, single elimination brackets are perfect if the number of contestants you have is a number that is a power of two. For example, the [NCAA Division I men's basketball tournament](https://en.wikipedia.org/wiki/NCAA_Division_I_men%27s_basketball_tournament) features 64 total teams. Each team here plays a match in the first round, and one team moves on. So each round, the remaining teams is halved. Round 1 is 64 teams, round 2 is 32, round 3 is 16, and so on until you have a winner with 1 team.

We can see that this yields `logBase2(64) = 6` rounds, each with `n / (2 * i)` matches in the round, where `n` is the number of competitors, `i` is the round. This yields a total of 63 matches over the course of the entire tournament (excluding any consolation matches). Notably, this is the minimum number of matches you can have in a tournament to determine a winner fairly.

However, this is an absolutely terrible way to run a mario kart tournament.

## Cool... why?

Woah woah woah, slow down there bucko. Do you think you're getting away with a simple answer? This is **MY** blog, and I **WILL** overexplain and give you a full understanding of tournament system mathematics if I want to.

As I was saying, a single elimination bracket is the minimum number of matches you can play to determine a fair winner. However, it has many downsides, such as:

- **You need a power of 2 to have a perfectly fair tournament**

  Now, this isn't to say that it's *impossible* to have a single-elimination tournament that consists of, say 40 participants. However, one way or another, you'll have to eventually *get to* a power of 2 by some means. You may do this by having the top teams get a [bye](https://en.wikipedia.org/wiki/Bye_(sports)) the first round, or conversely, have the worst teams do a [play-in round](https://en.wikipedia.org/wiki/Play-in_game) to get to a power of 2.

  Let's use a 40-person tournament as an example. To get to our nearest power of 2, we need to somehow get rid of 8 contestants. The most straightforward way would be to have the bottom 16 competitors play in a play-in round, so that 8 are eliminated, and the 8 that move on are the bottom 8 of the remaining 32 competitors. Or, in a more roundabout way, you could say that the top 32 teams get a bye the first round.

  Now, this isn't perfectly fair as there is an *unfair punishment* given to the unlucky bottom teams that need to play in the play-in round, or an *unfair reward* given to the lucky top teams that get a bye. In our 40-competitor example, there's no reason other than convenience that the bottom 16 teams need to do a play in round. This means that even though there shouldn't be that much of a difference of win percentage between the 23rd ranked team and the 24th ranked team, there is, because the 24th ranked team has to compete in a whole extra round, whereas the 23rd ranked team gets a free pass.

  Speaking of ranking, here's another problem with a single elimination (and any elimination-style bracket, actually):

- **You need competitors to be ranked going into the tournament**
  
  Now, for most organized sports with regular seasons, this isn't an issue. If you're wanting to host an improptu tournament where you don't have past performance statistics and matchup history though, you can't really rank the competitors. So doing a single elimination bracket would be even *worse*, as you'd have to arbitrarily assign ranks to each competitor, and hope that they're all around the same skill level. Otherwise, you could pair up the top two competitors in the first round, where the winner of such blows out all the competition in every subsequent round.

  This kind of randomness and potential for boring matchups is pretty terrible for both competitors and spectators alike. If you're eliminated early, you don't even get to watch an exciting bracket.

  In fact, being eliminated from a single loss sucks in general, which is another pain point of elimination-style brackets:

- **One bad match can cost you the tournament**

  Now, this is more of a personal opinion rather than a matter-of-fact. In single elimination tournaments, if you have one bad game and lose, you're done. Out. While double-elimination, and even triple-elimination can help alleviate this, it still puts a big emphasis on the single game, rather than a competitor's performance as a whole.

## Why is a bracket system bad for Mario Kart *specifically*?

Because brackets are traditionally for **1v1** matchups. Mario Kart lends itself to 4v4 (and even 12v12) matchups, so forcing a 1v1 matchup would be boring, awkward, and not in good spirit of how the game is usually played. This is what the tournament my university put on, and it wasn't great.

But how *do* you hold a tournament that doesn't have 1v1 matchups, anyways? I'm **so** glad you asked!

Instead, we can split the tournament up into two stages: the **Seeding Stage** and the **Elimination Stage**.

## The Seeding Stage

This would equate to the "regular season" for most leagues. However, we don't have a multi-month timespan for competition. Instead, we have only one, or maybe two days to run this thing.

The fairest way to determine a comprehensive ranking of each team would be to do a full **Round Robin Tournament**. However, just for a competition of 16 contestants, you would need a matchup of one contestant against every other contestant. This would be a 120 total matches, for a 1v1 setup. Even if we increase the match size to a 4v4 matchup, we still need to 