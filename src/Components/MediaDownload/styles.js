import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  messageContainer: {
    backgroundColor: '#e0f2f1',
    padding: 12,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '80%',
  },
  mediaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaDetails: {
    marginLeft: 10,
  },
  mediaTitle: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  mediaInfo: {
    fontSize: 12,
    color: '#555',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0088cc',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  downloadText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
  linkText: {
    color: 'blue',
  },
});
