package com.kemenu.kemenu_backend.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(staticName = "of")
public class Tuple<L, R> {
    L left;
    R right;
}
