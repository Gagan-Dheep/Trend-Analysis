import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from django.http import HttpResponse,response
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.conf import settings
import json
from .models.load_model import model, scaler, df
import pandas as pd
import os
import seaborn as sns 
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
# from django.db import IntegrityError
# from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
# from .models import UserModel

def home_page(request):
    return HttpResponse("home")

@csrf_exempt
@api_view(['POST'])
def register_view(request):
    data = json.loads(request.body)
    print("happening finally")
    # print(request.POST.get('username'))
    if request.method == 'POST':
        username =  data.get('username')
        email = data.get('email')
        password = data.get('password')

        username_exists = User.objects.filter(username=username).exists()
        email_exists = User.objects.filter(email=email).exists()

        if username_exists or email_exists:
            error_message = ""
            if username_exists:
                error_message += "Username already exists. "
            if email_exists:
                error_message += "Email already registered. "
            return JsonResponse({'message': error_message}, status=400)
        try:
            created = User.objects.create_user(username=username, email=email, password=password)
            created.save()
            print("User created successfully!")
            # return redirect('api/login')
            # return HttpResponse("yeah")
            return JsonResponse({'message': 'Successfully user is created'}, status=201)
        except Exception as e: 
            print(f"Error creating user: {e}")
            return JsonResponse({'message': f'Error creating user: {e}'}, status=400)  # status=status.HTTP_500_INTERNAL_SERVER_ERROR

    # else:
    #     return render(request, 'register.html')

# @csrf_exempt
# def login_view(request):
#     print("here")
#     data = json.loads(request.body)
#     print(data)
#     email = data.get('email')
#     password = data.get('password') 
#     email_exists = User.objects.filter(email=email).exists()
    
#     if email_exists:
#         request.session['logged_in'] = True 
#     if not email_exists:
#         return JsonResponse({'message': 'Email does not exist. create a new user'}, status=400)
        
#     return JsonResponse({'message': 'Successfully user is Logged in', 'success':'right'}, status=201)

 
@csrf_exempt
def login_view(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({'message': 'Email does not exist. Create a new user.'}, status=400)
    
    user = authenticate(username=user.username, password=password)
    if user is not None:
        login(request, user)
        request.session['logged_in'] = True 
        return JsonResponse({'message': 'Successfully logged in', 'success': 'right'}, status=200)
    else:
        return JsonResponse({'message': 'Invalid credentials'}, status=400)

@csrf_exempt
def logout_view(request):
    # print("logged out")
    logout(request)
    return JsonResponse({'isLoggedIn': 'False'})  

@csrf_exempt
def predict_engagement(request):
    global df

    if df is None:
        return JsonResponse({"jj":"Error loading data"}, status=500)
    # Simulate future data
    # months_ahead = int(request.GET.get('months_ahead', 1))
    # months_ahead = request.GET.get('months_ahead')
    # data = json.loads(request.body)
    def categorize_tweet(text):
        text = text.lower()
        
        if any(keyword in text for keyword in [
            'government', 'party', 'candidate', 'election', 'debate', 'policy', 
            'senate', 'congress', 'parliament', 'campaign', 'voting', 'legislation',
            'democrat', 'republican', 'politician', 'president', 'prime minister',
            'minister', 'cabinet', 'constitution', 'amendment', 'bill', 'law',
            'justice', 'court', 'judge', 'trial', 'verdict', 'sentence'
        ]):
            return 'Politics and Governance'
        
        elif any(keyword in text for keyword in [
            'economy', 'business', 'industry', 'development', 'company', 'market', 
            'trade', 'commerce', 'finance', 'investment', 'stock', 'banking',
            'entrepreneur', 'CEO', 'profit', 'loss', 'revenue', 'tax', 'budget',
            'inflation', 'recession', 'employment', 'unemployment', 'salary', 'wage'
        ]):
            return 'Business and Economy'
        
        elif any(keyword in text for keyword in [
            'community', 'society', 'culture', 'family', 'education', 'environment', 
            'social', 'public', 'welfare', 'justice', 'inequality', 'activism',
            'racism', 'sexism', 'discrimination', 'human rights', 'poverty', 'healthcare',
            'immigration', 'refugee', 'asylum', 'diversity', 'inclusion', 'equality'
        ]):
            return 'Social Issues'
        
        elif any(keyword in text for keyword in [
            'technology', 'innovation', 'computer', 'internet', 'digital', 'scientific', 
            'tech', 'software', 'hardware', 'ai', 'robotics', 'gadgets',
            'startup', 'venture capital', 'coding', 'algorithm', 'data', 'analytics',
            'cybersecurity', 'hacking', 'malware', 'virus', 'network', 'cloud'
        ]):
            return 'Technology and Innovation'
        
        elif any(keyword in text for keyword in [
            'lifestyle', 'health', 'leisure', 'entertainment', 'family', 'personal', 
            'wellness', 'fitness', 'hobby', 'recreation', 'travel', 'self-care',
            'food', 'fashion', 'beauty', 'sports', 'music', 'movie', 'tv', 'game'
        ]):
            return 'Personal and Lifestyle'
        
        elif any(keyword in text for keyword in [
            'news', 'event', 'media', 'report', 'public', 'information', 
            'breaking', 'update', 'headline', 'coverage', 'broadcast', 'journalism',
            'newspaper', 'magazine', 'online news', 'article', 'story', 'feature'
        ]):
            return 'Current Events and News'
    
        else:
            return 'Miscellaneous'

    df['Category'] = df['Text'].apply(categorize_tweet)
    months_ahead = 45
    if months_ahead is None:
        return JsonResponse({"n":"None"})  # or some default value

     # Load tweets data from the database
    # df = pd.DataFrame(list(Tweet.objects.all().values()))
    # file_path = settings.BASE_DIR / 'backend' / 'media' / 'twitter_dataset.csv'
    # df = pd.read_csv(file_path)
    df['Timestamp'] = pd.to_datetime(df['Timestamp'])
    df['Month'] = df['Timestamp'].dt.month
    df['Year'] = df['Timestamp'].dt.year 

    df_future = predict_future_trends(df, months_ahead)

    categories = df['Category'].unique()
    df_future['Category'] = np.random.choice(categories, size=len(df_future))

    category_future_engagement = df_future.groupby('Category')['Predicted_Engagement'].sum().reset_index()

    # Save the predicted engagement plot
    PLOT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'images')
    # print(f"Selector Path: {PLOT_DIR}")
    os.makedirs(PLOT_DIR, exist_ok=True)
    plt.figure(figsize=(12, 6))
    sns.barplot(x='Category', hue='Category', y='Predicted_Engagement', data=category_future_engagement, palette='viridis', legend=False)
    plt.title(f'Predicted Trending Topics by Engagement Score ({months_ahead} months ahead)')
    plt.xlabel('Category')
    plt.ylabel('Predicted Engagement Score')
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.savefig(os.path.join(PLOT_DIR, 'bar_plot.png'))
    plt.close()

    plt.figure(figsize=(10, 6))
    sns.lineplot(x='Category', y='Predicted_Engagement', data=category_future_engagement, legend=False)
    plt.title('Predicted Trending Topics by Engagement Score')
    plt.xlabel('Category')
    plt.ylabel('Predicted Engagement Score')
    plt.xticks(rotation=45)
    plt.savefig(os.path.join(PLOT_DIR, 'line_plot.png'))
    plt.close()

    plt.figure(figsize=(10, 6))
    sns.relplot(x='Category',  hue='Category', y='Predicted_Engagement', data=category_future_engagement, palette='viridis', legend=False)
    plt.title('Predicted Trending Topics by Engagement Score')
    plt.xlabel('Category')
    plt.ylabel('Predicted Engagement Score')
    plt.xticks(rotation=45)
    plt.savefig(os.path.join(PLOT_DIR, 'rel_plot.png'))
    plt.close()

    plt.figure(figsize=(10, 6))
    plt.pie(category_future_engagement['Predicted_Engagement'], labels=category_future_engagement['Category'], autopct='%1.1f%%')
    plt.title('Predicted Trending Topics by Engagement Score')
    plt.savefig(os.path.join(PLOT_DIR, 'pie_plot.png'))
    plt.close()

    # context = {'bar_path': './static/images/bar_plot.png', 'line_path': './static/images/line_plot.png', 'rel_path': './static/images/rel_plot.png', 'pie_path': './static/images/pie_plot.png'}
    return JsonResponse({
        "bar_plot": bar_plot_path,
        "line_plot": line_plot_path,
        "rel_plot": rel_plot_path,
        "pie_plot": pie_plot_path
    })
    # return JsonResponse({"success message":"Trend Successfully Detected"})
    # return render(request, 'predict_engagement.html', context)
    # print("yeah")
    # return HttpResponse(request, 'predict_engagement.html')

def predict_future_trends(df, months_ahead):
    df_future = df.copy()
    
    # Calculate future dates
    last_date = df['Timestamp'].max()
    future_dates = pd.date_range(start=last_date, periods=months_ahead+1, freq='ME')[1:]
    
    # Create future dataframe
    df_future = pd.DataFrame({
        'Timestamp': future_dates,
        'Month': future_dates.month,  
        'Year': future_dates.year
    })
    
    # Add variability to engagement metrics
    avg_retweets = df['Retweets'].mean()
    avg_likes = df['Likes'].mean()
    df_future['Retweets'] = np.random.normal(avg_retweets, avg_retweets * 0.1, size=len(df_future))
    df_future['Likes'] = np.random.normal(avg_likes, avg_likes * 0.1, size=len(df_future))
    
    # Ensure non-negative values
    df_future['Retweets'] = df_future['Retweets'].clip(lower=0)
    df_future['Likes'] = df_future['Likes'].clip(lower=0)
    
    # Prepare future data for prediction
    X_future = df_future[['Retweets', 'Likes', 'Month', 'Year']]
    X_future_scaled = scaler.transform(X_future)
    
    # Predict future engagement
    df_future['Predicted_Engagement'] = model.predict(X_future_scaled)
    
    return df_future

@csrf_exempt
def check_session(request):
    print("yeah")

    if request.method == 'OPTIONS':
        response = JsonResponse({'detail': 'OK'})
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'  
        response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response['Access-Control-Allow-Credentials'] = 'true'
        return response
    if request.user.is_authenticated:
        return JsonResponse({'isLoggedIn': 'True'})
    return JsonResponse({'isLoggedIn': 'False'})  