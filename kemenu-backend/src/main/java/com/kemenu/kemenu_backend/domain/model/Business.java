package com.kemenu.kemenu_backend.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Getter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(onConstructor = @__(@PersistenceConstructor))
public class Business {

    @Id
    @EqualsAndHashCode.Include
    private String id;
    private String name;
    private List<Menu> menus;
    private String imageUrl;
    private String phone;
    private String info;
    private String color;

    public Business(String name) {
        this(UUID.randomUUID().toString(), name, new ArrayList<>(), "", "", "", "#e7475e");
    }

    public String createMenu(Menu menu) {
        menus.add(menu);
        return menu.getId();
    }

    public Optional<Menu> changeMenu(Menu newMenu) {
        for (int i = 0; i < menus.size(); i++) {
            if (menus.get(i).getId().equals(newMenu.getId())) {
                menus.set(i, newMenu);
                return Optional.of(newMenu);
            }
        }

        return Optional.empty();
    }

    public Optional<Menu> findMenu(String menuId) {
        return menus.stream().filter(m -> m.getId().equals(menuId)).findFirst();
    }

    public void deleteMenu(String menuId) {
        menus.removeIf(menu -> menu.getId().equals(menuId));
    }

    // TODO: Refactor me pls
    public boolean isEmpty() {
        return menus.isEmpty() ||
            name.equalsIgnoreCase("test") ||
            name.equalsIgnoreCase("prueba") ||
            name.equalsIgnoreCase("Chiringo") ||
            name.equalsIgnoreCase("Arica Restobar") ||
            name.equalsIgnoreCase("Mikuna") ||
            name.equalsIgnoreCase("complejo 5ta") ||
            name.equalsIgnoreCase("Kenel") ||
            name.equalsIgnoreCase("UCA") ||
            name.equalsIgnoreCase("leonbra") ||
            name.equalsIgnoreCase("CERVECERÍA EL GALLO") ||
            name.equalsIgnoreCase("Azorin Computer") ||
            name.equalsIgnoreCase("Probando restaurante") ||
            name.equalsIgnoreCase("Donama") ||
            name.equalsIgnoreCase("EL BEYUSCO") ||
            name.equalsIgnoreCase("BODEGA L'ESSÈNCIA") ||
            name.equalsIgnoreCase("ES MAL PAS") ||
            name.equalsIgnoreCase("The Daily Industrial") ||
            name.equalsIgnoreCase("Bistrot Ovni") ||
            name.equalsIgnoreCase("Golf Playa") ||
            name.equalsIgnoreCase("Chill Burgers") ||
            name.equalsIgnoreCase("Sumapaz Restaurant") ||
            name.equalsIgnoreCase("Chiringuito de verano la estación") ||
            name.equalsIgnoreCase("La Posada") ||
            name.equalsIgnoreCase("Colors") ||
            name.equalsIgnoreCase("CAFETERIA TOLCAN") ||
            name.equalsIgnoreCase("Soleo Marbella") ||
            name.equalsIgnoreCase("Restaurante El Levante") ||
            name.equalsIgnoreCase("Marenostrum") ||
            name.equalsIgnoreCase("La Niña Vilassar") ||
            name.equalsIgnoreCase("Diversus LH") ||
            name.equalsIgnoreCase("El dorado") ||
            name.equalsIgnoreCase("Delirium Beer") ||
            name.equalsIgnoreCase("Bar El Olivar") ||
            name.equalsIgnoreCase("Mezzaluna") ||
            name.equalsIgnoreCase("Mi Restaurante") ||
            name.equalsIgnoreCase("Ustrukue Jatetxea") ||
            name.equalsIgnoreCase("la Cuina") ||
            name.equalsIgnoreCase("Bar cachola") ||
            name.equalsIgnoreCase("Restaurante Couder") ||
            name.equalsIgnoreCase("SL DEEP") ||
            name.equalsIgnoreCase("Bar restaurante los Tito's") ||
            name.equalsIgnoreCase("PARRILLADA MONTOTO") ||
            name.equalsIgnoreCase("Restaurante La frontera") ||
            name.equalsIgnoreCase("Restaurant Laredo Bar") ||
            name.equalsIgnoreCase("Rikisimo express") ||
            name.equalsIgnoreCase("Barrio Perú") ||
            name.equalsIgnoreCase("Trattoria italiana") ||
            name.equalsIgnoreCase("Valentino's") ||
            name.equalsIgnoreCase("ESPOCH") ||
            name.equalsIgnoreCase("Terrazza del Mare") ||
            name.contains("XEBRE") ||
            (menus.size() == 1 && menus.get(0).getSections().isEmpty()) ||
            (menus.size() == 1 && menus.get(0).getSections().size() == 1 && menus.get(0).getSections().get(0).getDishes().isEmpty()) ||
            (menus.size() == 1 && menus.get(0).getSections().size() == 1 && menus.get(0).getSections().get(0).getDishes().size() == 1);
    }
}
