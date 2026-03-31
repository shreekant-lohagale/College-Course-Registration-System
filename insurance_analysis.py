import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import os

# --- PART 2: EDA (Exploratory Data Analysis) ---

# 1. Load Dataset
# Ensure the path matches the renamed folder and file
file_path = os.path.join('insurance', 'insurance.csv')

try:
    df = pd.read_csv(file_path)
    print("--- PART 2: Exploratory Data Analysis (EDA) ---")
    print(f"\nDataset loaded successfully from: {file_path}")
except FileNotFoundError:
    print(f"Error: {file_path} not found. Please ensure the file is in the right location.")
    # Exit if file not found to prevent errors
    exit()

# 2. Dataset Overview
print("\n[INFO] First 5 records of the dataset:")
print(df.head())

print("\n[INFO] Dataset Information:")
print(df.info())

print("\n[INFO] Statistical Summary:")
print(df.describe())

# 3. Missing Values Check
print("\n[INFO] Checking for missing values:")
print(df.isnull().sum())

# 4. Data Visualizations
print("\nGenerating visualizations...")
plt.figure(figsize=(15, 10))

# Age vs Charges - Scatter Plot
plt.subplot(2, 2, 1)
sns.scatterplot(x='age', y='charges', data=df, hue='smoker', alpha=0.6)
plt.title('Age vs Charges (Colored by Smoker)')

# Smoker vs Charges - Box Plot
plt.subplot(2, 2, 2)
sns.boxplot(x='smoker', y='charges', data=df, palette='Set2')
plt.title('Smoker vs Charges (Impact of Smoking)')

# BMI vs Charges - Optional Check
plt.subplot(2, 2, 3)
sns.scatterplot(x='bmi', y='charges', data=df, hue='smoker', palette='magma', alpha=0.5)
plt.title('BMI vs Charges')

# Distribution of Charges
plt.subplot(2, 2, 4)
sns.histplot(df['charges'], kde=True, color='blue')
plt.title('Distribution of Medical Charges')

plt.tight_layout()
plt.savefig('insurance_eda_plots.png')
print("Plots saved as 'insurance_eda_plots.png'")

# 5. Insights
print("\n--- INSIGHTS ---")
print("1. Effect of Smoking: The box plot clearly shows that smokers have significantly higher medical charges compared to non-smokers.")
print("2. Relationship with Age: There is a steady upward trend in charges as age increases, which is expected as health risks rise with age.")
print("3. BMI Impact: High BMI correlates with higher charges, especially among smokers.")

# --- PART 3: Machine Learning (Regression) ---

print("\n--- PART 3: Machine Learning (Predictive Modeling) ---")

# 1. Preprocessing: Encoding Categorical Variables
# Convert categorical features into numerical format (One-Hot Encoding)
df_encoded = pd.get_dummies(df, columns=['sex', 'smoker', 'region'], drop_first=True)
print("\n[PREPROCESS] Data encoded for Machine Learning.")

# 2. Split Dataset
X = df_encoded.drop('charges', axis=1)
y = df_encoded['charges']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"[SPLIT] Training Set: {X_train.shape[0]} | Testing Set: {X_test.shape[0]}")

# 3. Implement Models
# Model A: Linear Regression
lr_model = LinearRegression()
lr_model.fit(X_train, y_train)
lr_preds = lr_model.predict(X_test)

# Model B: Random Forest Regressor
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)
rf_preds = rf_model.predict(X_test)

# 4. Evaluation
lr_mse = mean_squared_error(y_test, lr_preds)
rf_mse = mean_squared_error(y_test, rf_preds)

lr_r2 = r2_score(y_test, lr_preds)
rf_r2 = r2_score(y_test, rf_preds)

print(f"\n--- Model Comparison ---")
print(f"Linear Regression MSE: {lr_mse:.2f} | R2 Score: {lr_r2:.4f}")
print(f"Random Forest MSE: {rf_mse:.2f} | R2 Score: {rf_r2:.4f}")

# 5. Conclusion
if rf_mse < lr_mse:
    print("\n[CONCLUSION] Random Forest Regressor performs BETTER as it has a lower Mean Squared Error (MSE) and a higher R2 Score.")
else:
    print("\n[CONCLUSION] Linear Regression performs BETTER as it has a lower Mean Squared Error (MSE).")
