function navigate(section) {
  alert(`Navigating to: ${section}`);
  // Use window.location.href or your router here later
}

function navigate(section) {
  switch (section) {
    case 'scan':
      window.location.href = '../Scanner/scanner.html';
      break;
    case 'cart':
      window.location.href = '../Cart/cart.html';
      break;
    case 'history':
      window.location.href = '../History/history.html';
      break;
    default:
      alert('Unknown section: ' + section);
  }
}
