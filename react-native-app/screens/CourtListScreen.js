import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import { mockCourts, searchCourts, sortCourts } from '../data/mockCourts';

const { width, height } = Dimensions.get('window');

const CourtListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showSearch, setShowSearch] = useState(false);

  const filteredAndSortedCourts = useMemo(() => {
    const filtered = searchCourts(mockCourts, searchQuery);
    return sortCourts(filtered, sortBy);
  }, [searchQuery, sortBy]);

  const renderCourtCard = ({ item }) => (
    <TouchableOpacity
      style={styles.courtCard}
      onPress={() => navigation.navigate('CourtDetail', { court: item })}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.courtImage} />
        <View style={styles.imageOverlay}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <Text style={styles.favoriteIcon}>♡</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.courtInfo}>
        <View style={styles.courtHeader}>
          <Text style={styles.courtName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.courtPrice}>{item.price}</Text>
        </View>
        
        <Text style={styles.courtLocation} numberOfLines={1}>
          📍 {item.location}
        </Text>
        
        <View style={styles.courtDetails}>
          <View style={styles.surfaceContainer}>
            <Text style={styles.surface}>{item.surface}</Text>
          </View>
          <Text style={styles.reviewCount}>{item.reviewCount} reviews</Text>
        </View>
        
        <View style={styles.amenitiesContainer}>
          {item.amenities.slice(0, 2).map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
          {item.amenities.length > 2 && (
            <View style={styles.amenityTag}>
              <Text style={styles.amenityText}>+{item.amenities.length - 2}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSortButton = (sortType, label) => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        sortBy === sortType && styles.sortButtonActive
      ]}
      onPress={() => setSortBy(sortType)}
    >
      <Text style={[
        styles.sortButtonText,
        sortBy === sortType && styles.sortButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5E20" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.headerTitle}>Find Tennis Courts</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => setShowSearch(true)}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search courts, locations...</Text>
          <View style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </View>
        </TouchableOpacity>
      </View>

      

      {showSearch && (
        <View style={styles.searchModal}>
          <TouchableOpacity 
            style={styles.searchModalOverlay}
            onPress={() => setShowSearch(false)}
            activeOpacity={1}
          >
            <View style={styles.searchModalContent}>
              <View style={styles.searchInputContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search courts by name, location, or surface..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus={true}
                />
                <TouchableOpacity 
                  onPress={() => {
                    setSearchQuery('');
                    setShowSearch(false);
                  }}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearIcon}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {searchQuery && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {filteredAndSortedCourts.length} courts found
          </Text>
          <Text style={styles.searchQueryText}>
            for "{searchQuery}"
          </Text>
        </View>
      )}

    

      <FlatList
        data={filteredAndSortedCourts}
        renderItem={renderCourtCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎾</Text>
            <Text style={styles.emptyText}>No courts found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search terms or browse all courts
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#999',
    marginLeft: 12,
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 16,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeAction: {
    backgroundColor: '#4CAF50',
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  activeActionText: {
    color: '#fff',
  },
  searchModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  searchModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  searchModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  clearButton: {
    padding: 8,
  },
  clearIcon: {
    fontSize: 18,
    color: '#6c757d',
  },
  statsBanner: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#6c757d',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sortContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sortButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sortButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  resultsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  resultsText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  searchQueryText: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
    fontStyle: 'italic',
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  courtCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  courtImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e9ecef',
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
    padding: 12,
  },
  ratingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  ratingText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 16,
    color: '#666',
  },
  courtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courtPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  courtInfo: {
    padding: 20,
  },
  courtName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  courtLocation: {
    fontSize: 15,
    color: '#6c757d',
    marginBottom: 12,
    fontWeight: '500',
  },
  courtDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  surfaceContainer: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  surface: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  amenityTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  amenityText: {
    fontSize: 12,
    color: '#495057',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#adb5bd',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default CourtListScreen;
