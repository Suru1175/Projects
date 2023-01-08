import pandas
import sklearn
dataset = pandas.read_csv('Squid Game.csv')
dataset
dataset.info()
dataset.describe()
dataset.columns
X = dataset[[ 'Age', 'Strength', 'Intelligence', 'Kabaddi', 'Hide_and_seek','Hopscotch', 'Carrom', 'Pitthoo']]
X
y = dataset['Survived']
y
import seaborn as sns
intt = dataset['Intelligence']
sns.countplot(y,hue = intt)
dataset.isnull()
sns.heatmap(dataset.isnull())
intel = pandas.get_dummies(X['Intelligence'] , drop_first = True)
intel
age = pandas.get_dummies(X['Age'] , drop_first = True)
age
stren = pandas.get_dummies(X['Strength'] , drop_first = True)
stren
kab = pandas.get_dummies(X['Kabaddi'] , drop_first = True)
kab
hns = pandas.get_dummies(X['Hide_and_seek'] , drop_first = True)
hns
hop = pandas.get_dummies(X['Hopscotch'] , drop_first = True)
hop
cam = pandas.get_dummies(X['Carrom'] , drop_first = True)
cam
pit = pandas.get_dummies(X['Pitthoo'] , drop_first = True)
pit
complete_ds = pandas.concat([intel ,age, stren, kab, hns, hop, cam , pit ] ,axis = 1)
complete_ds
from sklearn.model_selection import train_test_split
help(train_test_split)
X_train, X_test, y_train, y_test = train_test_split(complete_ds, y, test_size=0.30)
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X_train,y_train)
model.coef_
y_pred = model.predict(X_test)
y_pred
mse = sklearn.metrics.mean_squared_error(y_test,y_pred)
print(mse)
import numpy as np
y_pred_np = np.array(y_pred)
y_pred_np
Name1 = dataset['Name']
Name1
for i in range(len(y_pred_np)):
    if ((y_pred_np == 1).any()):
        print("Survived Name : " ,Name1[i])
    else:
        pass
