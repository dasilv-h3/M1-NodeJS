class Club {
  final int id;
  final String description;
  final String history;

  // Constructeur
  Club({required this.id, required this.description, required this.history});

  // Méthode pour convertir un JSON en un objet Club
  factory Club.fromJson(Map<String, dynamic> json) {
    return Club(
      id: json['id'] ?? 0, // Valeur par défaut si 'id' est absent
      history: json['history'] ?? '',
      description: json['description'] ?? '',
    );
  }

  // Méthode pour convertir une liste de JSON en une liste de Clubs
  static List<Club> fromJsonList(List<dynamic> jsonList) {
    return jsonList
        .map((json) => Club.fromJson(json as Map<String, dynamic>))
        .toList();
  }

  // Méthode pour convertir un objet Club en JSON
  Map<String, dynamic> toJson() {
    return {'id': id, 'description': description, 'history': history};
  }
}
