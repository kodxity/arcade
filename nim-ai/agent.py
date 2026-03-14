import pandas as pd
import numpy as np
import random
import sklearn
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.pipeline import make_pipeline
from sklearn.compose import make_column_selector, make_column_transformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.neural_network import MLPClassifier, MLPRegressor
from sklearn.datasets import load_diabetes
from sklearn.metrics import classification_report,  accuracy_score, balanced_accuracy_score

test = 1000

sklearn.set_config(display='diagram')


arr = [[0,0,0]] # whoever took last stone wins, so 0 = lose

for i in range(10000):
    num = i+1
    if(num%6==0): # losing
        arr.append([num,0,1])
    else:
        arr.append([num,1,num%6])

arr = np.array(arr)

df = pd.DataFrame(arr,columns=['state', 'winning', 'move'])
df


X = df.drop(["winning","move"], axis=1)
y = df[["winning","move"]]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)



preprocessor = make_column_transformer(
    (OneHotEncoder(), make_column_selector(dtype_include=object)),
    (StandardScaler(), make_column_selector(dtype_include=np.number)),
)
preprocessor



neural_net = MLPRegressor(
    # Presenter note: don't add these parameters right away, come back and add them later
    hidden_layer_sizes=(50, 30, 10),
    max_iter=5000,
    learning_rate_init=0.00001,
    )
nim_model = make_pipeline(preprocessor, neural_net)
nim_model

nim_model.fit(X_train, y_train)

nim_model.score(X_test, y_test)

loss_curve = nim_model.named_steps.mlpregressor.loss_curve_
pd.Series(loss_curve).plot.line()

pd.DataFrame({'loss': loss_curve[-10:], 'best_loss': nim_model[-1].best_loss_}).plot.line()