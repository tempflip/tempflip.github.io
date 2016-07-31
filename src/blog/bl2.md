---
title: Lakásárak és lineáris regresszió #1
template: blog.hbt
collections: blog
date: 2016-07-31
---

Első projektemet a a sztenderdnek mondható adatszettel csinálom - a [Boston Housing Data](https://archive.ics.uci.edu/ml/datasets/Housing) egy 78-as felmérés ötszáz bostoni lakás áráról, illetve egyéb tulajdonságairól, egész pontosan:

```
 1. CRIM per capita crime rate by town
 2. ZN proportion of residential land zoned for lots over 25,000 sq.ft.
 3. INDUS proportion of non-retail business acres per town
 4. CHAS Charles River dummy variable (= 1 if tract bounds river; 0 otherwise)
 5. NOX nitric oxides concentration (parts per 10 million)
 6. RM average number of rooms per dwelling
 7. AGE proportion of owner-occupied units built prior to 1940
 8. DIS weighted distances to five Boston employment centres
 9. RAD index of accessibility to radial highways
 10. TAX full-value property-tax rate per $10,000
 11. PTRATIO pupil-teacher ratio by town
 12. B 1000(Bk - 0.63)^2 where Bk is the proportion of blacks by town
 13. LSTAT % lower status of the population
 14. MEDV Median value of owner-occupied homes in $1000's
```

Azt feltételezem, hogy egy adott ingatlan néhány (vagy akár az összes) tulajdonságát ismerve viszonylag jó pontossággal előrejelezhető annak az ára. Az elsőre nem tűnik butaságnak, hiszen egy lakás árát jellemzően olyan tényezők befolyásolják, mint a bűnözés mértéke az adott kerületben, vagy éppen a város központjának közelsége.

(bl2_1)

Egy plotot nyomtatva a bűnözés (CRIM, x tengely) és a lakásárak (MEDV, x tengely) összefüggéséről, látható, hogy valóban van _valamiféle_ összefüggés. Ha ismernénk azt a függvényt, aminek megaddva változónak a bűnözés mértékét megkapnánk a hozzá tartozó pontot a fent rajzolt vonalon, akkor meg is lenne a _betanított gépi tanulás modellünk_.

# Tanítás

Ez egy klasszikus [felügyelt tanulási probléma] (https://en.wikipedia.org/wiki/Supervised_learning)
* Rendelkezésre állnak a bemeneti adatok (a bűnözés mértéke)
* Rendelkezésre áll az ahhoz tartozó eredmény (az ingatlan ára)
* Egy függvényt szeretnénk, ami a bemenetet az kimenetté alakítja
* Abban reménykedünk, hogy az így készített modell a kellőképpen általános lesz, tehát alkalmazható eddig ismeretlen adatokra is

## Tanulási algoritmus

Tanulási algoritmusként a lineáris regressziót foglyuk használni. Semmi mást nem csinál, mint megtalálja azt az egyenest, ami a legjobban illeszkedik a tanulási pontjainkra, majd új bemeneti értékekre is kiszámolja az egyenes megfelelő pontjait. (Ez nem feltétlenül a legjobb választás, de egyszerűsége miatt most kiválóan megfelel).

## Az egyenes

Egy egyenest így lehet leírni:

`a + bx`

`a` a tengelytől való távolság, míg `b` az egyenes dőlése. Amikor egy tanuló algoritmusnak (például a lineáris regressziónak) megadjuk a tanuló-pontokat, akkor a számítógép addig tologatja az `a` és `b` pontokat, amíg a hiba mértéke a lehető legkisebb lesz.

## A hiba

A kapott egyenes természetesen nem fog tökéletesen illeszkedni a pontjainkra (legalábbis nem valószínű), ezért bizonyos hibával számolni kell. A hiba mértékét többféleképpen ki lehet számolni, a legegyszerűbb számítás talán a _Mean Squared Error_, (átlagos négyzetes hiba). Itt minden pontnál kiszámítjuk, mennyivel tér el a függvény által talált értéktől, majd a az eltérések négyzetét átlagoljuk (a négyzet miatt nem kell törődni a plusz-minusz eltérésekkel, illetve az extrém hibák jobban számítanak).


# Lineáris regresszió python-nal

Először is szükségünk lesz egy modellre. A modellnek két dolgot mindenképpen tudnia kell: tanulni és előrejelezni.

```
class Linear_Model(Model):
    def __init__(self):
        Model.__init__(self)
        pass

    def train(self, training_x_matrix, training_y_matrix):
        # creating a 1...n space len of the training matrix
        my_space = training_x_matrix.reshape(-1,1)

        # training the model
        regr = linear_model.LinearRegression()
        regr.fit(my_space, training_y_matrix)
        self.model = regr

    def predict(self, x):
        return self.model.predict(x)
```


És valójában ezzel kész is vagyunk, nem is kell mást tennünk mint betanítani, majd előrejelezni.

```
col = 'B'
regr = Linear_Model()
regr.train(norm[col], norm['MEDV'])
predictions[col] = [regr.predict(x) for x in norm[col].values]
print "MSE for {}: {}".format(col, mean_squared_error(norm['MEDV'], predictions[col]))
```

A figyelmes olvasó észreveheti, hogy valójában semmi "értelmeset" nem csináltunk a fenti sorokban, hiszen azokkal az értékekkel futattuk az előrejelzést, amelyekkel tanítottuk a modellt. Így azonban az utolsó sorban össze tudjuk hasonlítani a valódi értékeket az előrejelzésekkel, vagyis információt kaphatunk a modell "jóságáról". A lenti grafikonon a kék pontok a valódi értékek, míg a piros az lineáris regresszival készített előrejelzés _ugyanezekre_ az értkékekre. Az MSE értéke ennél a vonalnál 0.0354, ami nem túl meggyőző. Ez képen és látható, hiszen a vonal illeszkedése nem túl jó.

img3


A következő postban azzal foglalkozok, hogyan lehet jobb illeszkedést elérni.





