import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Modal,
} from 'react-native';

const CourtDetailScreen = ({ route, navigation }) => {
  const { court } = route.params;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [recommendToFriends, setRecommendToFriends] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'Tennis Pro',
      rating: 5,
      text: 'Excellent courts with great lighting and well-maintained surfaces. Highly recommended!',
      date: '2024-01-15',
    },
    {
      id: 2,
      user: 'Court Regular',
      rating: 4,
      text: 'Good facilities but can get crowded during peak hours. Staff is very friendly.',
      date: '2024-01-10',
    },
    {
      id: 3,
      user: 'Weekend Warrior',
      rating: 5,
      text: 'Perfect for weekend matches. Clean courts and great atmosphere.',
      date: '2024-01-08',
    },
  ]);

  const handleSubmitReview = () => {
    if (reviewText.trim().length < 10) {
      Alert.alert('Review Too Short', 'Please write at least 10 characters for your review.');
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      user: 'You',
      rating: reviewRating,
      text: reviewText.trim(),
      date: new Date().toISOString().split('T')[0],
      recommendToFriends: recommendToFriends,
    };

    setReviews([newReview, ...reviews]);
    setReviewText('');
    setReviewRating(5);
    setRecommendToFriends(false);
    setShowReviewModal(false);
    
    Alert.alert('Review Submitted', 'Thank you for your review!');
  };

  const renderStars = (rating, onPress = null) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress && onPress(star)}
            disabled={!onPress}
            style={onPress ? styles.starButton : null}
          >
            <Text style={[
              styles.star,
              star <= rating ? styles.starFilled : styles.starEmpty
            ]}>
              {star <= rating ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderReview = (review) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUser}>{review.user}</Text>
        <View style={styles.reviewRating}>
          {renderStars(review.rating)}
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: court.image }} style={styles.courtImage} />
          <View style={styles.imageOverlay}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteButton}>
              <Text style={styles.favoriteIcon}>♡</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.courtHeader}>
            <View style={styles.courtTitleSection}>
              <Text style={styles.courtName}>{court.name}</Text>
              <Text style={styles.courtLocation}>📍 {court.location}</Text>
            </View>
            <Text style={styles.courtPrice}>{court.price}</Text>
          </View>
          
          <View style={styles.ratingSection}>
            <View style={styles.ratingContainer}>
              {renderStars(court.rating)}
              <Text style={styles.ratingText}>
                {court.rating} • {court.reviewCount} reviews
              </Text>
            </View>
          </View>

          <View style={styles.quickInfoCards}>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardIcon}>🏟️</Text>
              <Text style={styles.infoCardLabel}>Surface</Text>
              <Text style={styles.infoCardValue}>{court.surface}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardIcon}>📍</Text>
              <Text style={styles.infoCardLabel}>Distance</Text>
              <Text style={styles.infoCardValue}>2.3 mi</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardIcon}>⭐</Text>
              <Text style={styles.infoCardLabel}>Rating</Text>
              <Text style={styles.infoCardValue}>{court.rating}</Text>
            </View>
          </View>

          <View style={styles.amenitiesSection}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {court.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Text style={styles.amenityIcon}>✓</Text>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{court.description}</Text>
          </View>

          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
              <TouchableOpacity
                style={styles.writeReviewButton}
                onPress={() => setShowReviewModal(true)}
              >
                <Text style={styles.writeReviewText}>Write Review</Text>
              </TouchableOpacity>
            </View>
            
            {reviews.map(renderReview)}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showReviewModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowReviewModal(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Write a Review</Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitReview}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.courtNameModal}>{court.name}</Text>
            
            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>Your Rating:</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setReviewRating(star)}
                    style={styles.starButton}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.star,
                      star <= reviewRating ? styles.starFilled : styles.starEmpty
                    ]}>
                      {star <= reviewRating ? '⭐' : '☆'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.ratingText}>
                {reviewRating === 1 ? 'Poor' : 
                 reviewRating === 2 ? 'Fair' : 
                 reviewRating === 3 ? 'Good' : 
                 reviewRating === 4 ? 'Very Good' : 'Excellent'}
              </Text>
            </View>

            <View style={styles.recommendSection}>
              <Text style={styles.recommendLabel}>Would you recommend this court to friends?</Text>
              <View style={styles.recommendButtons}>
                <TouchableOpacity
                  style={[
                    styles.recommendButton,
                    recommendToFriends === true && styles.recommendButtonActive
                  ]}
                  onPress={() => setRecommendToFriends(true)}
                >
                  <Text style={[
                    styles.recommendButtonText,
                    recommendToFriends === true && styles.recommendButtonTextActive
                  ]}>
                    👍 Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.recommendButton,
                    recommendToFriends === false && styles.recommendButtonActive
                  ]}
                  onPress={() => setRecommendToFriends(false)}
                >
                  <Text style={[
                    styles.recommendButtonText,
                    recommendToFriends === false && styles.recommendButtonTextActive
                  ]}>
                    👎 No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.reviewLabel}>Your Review:</Text>
            <TextInput
              style={styles.reviewInput}
              placeholder="Share your experience at this court..."
              placeholderTextColor="#999"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    position: 'relative',
  },
  courtImage: {
    width: '100%',
    height: 280,
    backgroundColor: '#e0e0e0',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#333',
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#666',
  },
  infoContainer: {
    padding: 20,
  },
  courtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  courtTitleSection: {
    flex: 1,
    marginRight: 16,
  },
  courtName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 28,
  },
  courtLocation: {
    fontSize: 16,
    color: '#666',
  },
  courtPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  ratingSection: {
    marginBottom: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  quickInfoCards: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoCardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoCardLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  amenitiesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  amenityIcon: {
    fontSize: 14,
    color: '#4CAF50',
    marginRight: 6,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  reviewsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  writeReviewButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  writeReviewText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  reviewCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  courtNameModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  ratingSection: {
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  starButton: {
    padding: 12,
    marginHorizontal: 4,
  },
  star: {
    fontSize: 32,
    textAlign: 'center',
  },
  starFilled: {
    color: '#FFD700',
  },
  starEmpty: {
    color: '#E0E0E0',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 4,
  },
  recommendSection: {
    marginBottom: 20,
  },
  recommendLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  recommendButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  recommendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  recommendButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  recommendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  recommendButtonTextActive: {
    color: '#fff',
  },
  reviewLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 120,
  },
});

export default CourtDetailScreen;
