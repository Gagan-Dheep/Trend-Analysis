import os
import pickle
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Define the path to your files relative to the Django project root
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'random_forest_model.pkl')
SELECTOR_PATH = os.path.join(BASE_DIR, 'models', 'feature_selector.pkl')
DATA_PATH = os.path.join(BASE_DIR, 'models', 'twitter_dataframe.pkl')

# print(f"Model Path: {MODEL_PATH}")
# print(f"Selector Path: {SELECTOR_PATH}")
# print(f"Data Path: {DATA_PATH}")

def load_model():
    try:
        if not os.path.exists(MODEL_PATH): 
            raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")
        if not os.path.exists(SELECTOR_PATH):
            raise FileNotFoundError(f"Selector file not found: {SELECTOR_PATH}")
        if not os.path.exists(DATA_PATH):
            raise FileNotFoundError(f"Data file not found: {DATA_PATH}")

        with open(MODEL_PATH, 'rb') as model_file:
            model = pickle.load(model_file)

        with open(SELECTOR_PATH, 'rb') as selector_file:
            scaler = pickle.load(selector_file)

        # Check the type of scaler to ensure it's loaded correctly
        if not isinstance(scaler, StandardScaler):
            raise TypeError("Loaded object is not a StandardScaler") 

        df = pd.read_pickle(DATA_PATH)
        
        return model, scaler, df
    
    except Exception as e:
        print(f"Error loading files: {e}")
        return None, None, None

# Load the model, selector, and data when this module is imported
model, scaler, df = load_model()
 