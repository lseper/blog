---
title: 'The Mathematics of Mariokart Tournaments'
excerpt: 'Why designing a fair and fun tournament for one of Nintendo's most iconic franchises is harder than you think.'
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

## ...why?

A single elimination bracket is the minimum number of matches you can play to determine a fair winner. However, it has many downsides, such as:

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

The fairest way to determine a comprehensive ranking of each team would be to do a full **Round Robin Tournament**. However, just for a competition of 16 contestants, you would need a matchup of one contestant against every other contestant. This would be a 120 total matches, for a 1v1 setup. And if you're playing by strict round-robin rules, this gets even *worse* when you have many-versus-many matchups.

In a strict interpretation of a round robin tournament, we'd want to make sure then that *every* participant played *every* other participant in *every* possible match configuration. Or put into math terms, we'd want every possible unique matchup of length *m*, where *m* is our matchup size. 

This is just a trusty combination formula of `nCr = n! / r!(n - r)!` - so for a tournament with 16 participants, in a 4v4 matchup, our number of matchups has ballooned to `16C4 = 16! / 4!(16 - 4)!` = **1820 matches**.

So obviously, this is unreasonable to do in any fixed amount of time. So how do we seed participants in a reasonable amount of time? There's a couple approaches, and they each have their trade-offs, but I will be focusing on using what's called the **Swiss Pairing System**.

### What is Swiss Pairing System?

Woah. That's a fancy name, but what's it mean? The Accelerated Swiss Pairing System matchmaking system used primarily in [Swiss Tournament Systems](https://en.wikipedia.org/wiki/Swiss-system_tournament) to determine relative ranks of competitors quickly. It's most effective at determining the **extremes** of participants (the absolute best, and absolute worst of your participant pool).

It works like this. Let's say we have eight participants in our Mario Kart tournament, Mario, Luigi, Peach, Daisy, Wario, Waluigi, Toad, and Bowser. We can list them in no particular order like such:

1. Mario
2. Luigi
3. Peach
4. Daisy
5. Wario
6. Waluigi
7. Toad
8. Bowser

To illustrate how this system can work with any kind of matchup, we'll start with just a traditional 1v1 matchup. Our first set of matches can be anything really, but we'll use circle seeding to determine them like so:

- **Round 1**

1. Mario plays Wario -> Mario wins
2. Luigi plays Waluigi -> Luigi wins
3. Peach plays Toad -> Peach wins
4. Daisy plays Bowser -> Daisy wins

So our standings look like such after the first round of matches:

1. Mario (1-0)
2. Luigi (1-0)
3. Peach (1-0)
4. Daisy (1-0)
5. Wario (0-1)
6. Waluigi (0-1)
7. Toad (0-1)
8. Bowser (0-1)

For round two, we then sort the participants based on their standing, and then create matchups across participants with similar ranks, like so:

1. Mario plays Peach -> Mario wins
2. Luigi plays Daisy -> Luigi wins
3. Wario plays Toad -> Wario wins
4. Waluigi plays Bowser -> Waluigi wins

So our standings look like such after the second round of matches:

1. Mario (2-0)
2. Luigi (2-0)
3. Peach (1-1)
4. Daisy (1-1)
5. Wario (1-1)
6. Waluigi (1-1)
7. Toad (0-2)
8. Bowser (0-2)

We can then continue on to the third round, where the matchups are like so:

1. Mario plays Luigi -> Mario wins
2. Peach plays Wario -> Peach wins
3. Daisy plays Waluigi -> Daisy wins
4. Toad plays Bowser -> Toad wins

So our standings after only three rounds of seeding are:

1. Mario (3-0)
2. Luigi (2-1)
3. Peach (2-1)
4. Daisy (2-1)
5. Wario (1-2)
6. Waluigi (1-2)
7. Toad (1-2)
8. Bowser (0-3)

As you can see, this system is great at quickly determining the absolute best, and absolute worst participants - after only three rounds, we can pretty definitively say that Mario is the best contestant, and Bowser is the worst contestant, and we did this in only three rounds of competition.

### Swiss Pairing System in Many-Versus-Many matchups

Where this system really shines is in many-versus-many matchup lengths. Lets say we are hosting our Mario Kart tournament with 4 players to a match. Finishing each rank in a race yields these "points" for the given racer:

1. Finishing first awards 3 points
2. Finishing second awards 2 points
3. Finishing third awards 1 point
4. Finishing fourth awards 0 points

So, let's repeat our tournament but with the following first round:

- **Round 1**

Race 1: (Mario, Peach, Wario, Toad)

1. Mario
2. Peach
3. Wario
4. Toad

Race 2: (Luigi, Daisy, Waluigi, Bowser)

1. Luigi
2. Daisy
3. Waluigi
4. Bowser

So our standings after the first round are:

1. Mario (3)
2. Luigi (3)
3. Peach (2)
4. Daisy (2)
5. Wario (1)
6. Waluigi (1)
7. Toad (0)
8. Bowser (0)

Then Round 2 would be:

- **Round 2**

Race 1: (Mario, Luigi, Peach, Daisy)

1. Mario
2. Luigi
3. Peach
4. Daisy

Race 2: (Wario, Waluigi, Toad, Bowser)

1. Wario
2. Waluigi
3. Toad
4. Bowser

Yielding standings of:

1. Mario (6)
2. Luigi (5)
3. Wario (4)
4. Peach (3)
5. Waluigi (3)
6. Daisy (2)
7. Toad (1)
8. Bowser (0)

Wow! With just two rounds, we've almost got a completely unique stratification of contestants! Granted Waluigi and Peach are still tied score-wise, but with only four total races, we've already determined a pretty decent seeding of contestants - and I think we can agree that 4 is much less than `8!/(4!(4!)) = 70`

Great! We now have a quick system to rank competitors so that we can seed them accordingly going into the Elimination Stage of our tournament. But before you go reaching for your trusty single (and maybe even double) elimination brackets, just hold on one second! I'm going to propose a different elimination system that solves that last problem we have:

- **You need a power of 2 to have a perfectly fair tournament**

This is where a lesser used elimination style bracket comes into play - [Ladder Elimination](https://en.wikipedia.org/wiki/Ladder_tournament). The philosophy is simple: Rank the contestants from best to worst, then have the worst contestants play each other. The winner moves on to play the next lowest ranked player in the ladder, and so on until the number one ranked player plays whomever is left standing in the championship match.

This shines exceedingly well with a 4v4 matchup style. Given our example Swiss seeding round we did above, we can show what the elimination stage would be like using Ladder Elimination:

- **Match 1**

Waluigi vs. Daisy vs. Toad vs. Bowser

Results:

1. Waluigi
2. Daisy
3. Toad
4. Bowser

Waluigi and Daisy move on, Toad and Bowser are eliminated.

- **Match 2**

Wario vs. Peach vs. Waluigi vs. Daisy

1. Wario
2. Peach
3. Waluigi
4. Daisy

Wario and Peach move on, Waluigi and Daisy are eliminated.

- **Match 3**

Mario vs. Luigi vs. Wario vs. Peach

1. Mario
2. Luigi
3. Wario
4. Peach

Mario is the champion!

### So, why is this better than a bracket elimination style tournament?

First, is because we *don't have to have a perfect power of 2 to have a fair elimination format.*

As an example, say we had another contestant in our tournament - Funky Kong - who did very poor during his seeding matchups and is ranked last going into the elimination bracket. The first matchup would then simply be:

- **Match 1**

 Daisy vs. Toad vs. Bowser vs. Funky Kong

Now you might be thinking "Wait! If we played out the tournament the same as we did before, wouldn't we have an unequal matchup at the end?" And you'd be correct. If we took the two top competitors from each race, we'd end up with:

Start of elimination: 9 contestants

1. Match 1 -> 7 contestants
2. Match 2 -> 5 contestants
3. Match 3 -> 3 contestants
4. Championship

Oh no! We'd always want to have a nice 4-player championship, so what do we do? Well, this is where the ladder system shines, as *each match is independent of the next match*. Or rather, we can just choose to take only the *top* contestant from that first matchup, instead of the top *two*. Then, our elimination would look like this:

Start of elimination: 9 contestants

1. Match 1 -> 6 contestants
2. Match 2 -> 4 contestants
3. Championship

The great part about this is, you can have these elimination matches be as low or high stakes as you'd like! For example, we could say that we only eliminate one contestant per Ladder Elimination match. So our elimination would look like this:

Start of elimination: 9 contestants

1. Match 1 -> 8 contestants
2. Match 2 -> 7 contestants
3. Match 3 -> 6 contestants
4. Match 4 -> 5 contestants
5. Match 5 -> 4 contestants
6. Championship

You can see how this amount of flexibility is nice when you're a tournament organizer having to balance time restraints - if you have less time, then eliminate more contestants per elimination match; if you have more time, eliminate less contestants per elimination match.

- **Alright, you've convinced me. But actually running a tournament like this seems harder than just filling out a simple elimination bracket. How am I supposed to keep track of all of this?**

Oh I am *so* glad you asked. Allow me to present a website that will keep track of all of all of this for you - **[Slipstream, the Mariokart tournament management you didn't need, but I made for you anyway](https://www.slipstreamapp.net/)**. It's also completely serverless and saves data to your machine using localStorage, which I think is pretty neat.

Thanks for reading, and happy racing! 🏁
