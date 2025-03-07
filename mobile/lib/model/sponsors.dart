class Sponsor {
  int id;
  String logo;
  String url;
  String? name; // Nullable pour éviter les erreurs

  Sponsor({
    required this.id,
    required this.logo,
    required this.url,
    this.name, // Peut être null
  });

  // Convertit un JSON en objet Sponsor
  factory Sponsor.fromJson(Map<String, dynamic> json) {
    return Sponsor(
      id: json['id'] ?? 0,
      logo: json['logo'] ?? '',
      url: json['url'] ?? '',
      name: json['name'], // Peut être null, donc pas de fallback
    );
  }

  // Convertit un objet Sponsor en JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'logo': logo,
      'url': url,
      'name': name, // Peut être null
    };
  }
}
